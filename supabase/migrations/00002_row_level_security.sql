-- ============================================================
-- HOLY.ARMY ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Helper function: Is current user a platform administrator or staff?
CREATE OR REPLACE FUNCTION public.is_platform_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND platform_role IN ('SUPER_ADMIN', 'ADMIN', 'STAFF')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function: Is user a member of an organization?
CREATE OR REPLACE FUNCTION public.is_org_member(target_org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE organization_id = target_org_id
    AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function: Does user have an elevated role in the organization?
CREATE OR REPLACE FUNCTION public.is_org_admin(target_org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE organization_id = target_org_id
    AND user_id = auth.uid()
    AND role IN ('OWNER', 'ADMIN')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PROFILES RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile or staff can view all"
ON public.profiles FOR SELECT
USING (auth.uid() = id OR public.is_platform_staff());

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 2. ORGANIZATIONS RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members and platform staff can view organizations"
ON public.organizations FOR SELECT
USING (public.is_org_member(id) OR public.is_platform_staff());

CREATE POLICY "Org admins or platform staff can update organizations"
ON public.organizations FOR UPDATE
USING (public.is_org_admin(id) OR public.is_platform_staff());

-- 3. ORGANIZATION MEMBERS RLS
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view members of their organization"
ON public.organization_members FOR SELECT
USING (public.is_org_member(organization_id) OR public.is_platform_staff());

CREATE POLICY "Org admins can manage members"
ON public.organization_members FOR ALL
USING (public.is_org_admin(organization_id) OR public.is_platform_staff());

-- 4. PLANS (Public read for active plans)
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active plans"
ON public.plans FOR SELECT
USING (is_active = TRUE OR public.is_platform_staff());

-- 5. SUBSCRIPTIONS RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can view their subscription"
ON public.subscriptions FOR SELECT
USING (public.is_org_member(organization_id) OR public.is_platform_staff());

CREATE POLICY "Platform staff can manage subscriptions"
ON public.subscriptions FOR ALL
USING (public.is_platform_staff());

-- 6. INVOICES & PAYMENTS RLS
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can view their invoices"
ON public.invoices FOR SELECT
USING (public.is_org_member(organization_id) OR public.is_platform_staff());

CREATE POLICY "Org members can view invoice items"
ON public.invoice_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.invoices i
    WHERE i.id = invoice_id AND (public.is_org_member(i.organization_id) OR public.is_platform_staff())
  )
);

CREATE POLICY "Org members can view payments"
ON public.payments FOR SELECT
USING (public.is_org_member(organization_id) OR public.is_platform_staff());

CREATE POLICY "Org members can submit manual payments"
ON public.payments FOR INSERT
WITH CHECK (public.is_org_member(organization_id));

-- 7. CREATIVE REQUESTS RLS
ALTER TABLE public.creative_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can view creative requests"
ON public.creative_requests FOR SELECT
USING (public.is_org_member(organization_id) OR public.is_platform_staff());

CREATE POLICY "Org members can create creative requests"
ON public.creative_requests FOR INSERT
WITH CHECK (public.is_org_member(organization_id));

CREATE POLICY "Org members or staff can update creative requests"
ON public.creative_requests FOR UPDATE
USING (public.is_org_member(organization_id) OR public.is_platform_staff());

-- 8. DELIVERABLES & APPROVALS RLS
ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can view deliverables"
ON public.deliverables FOR SELECT
USING (public.is_org_member(organization_id) OR public.is_platform_staff());

CREATE POLICY "Staff can manage deliverables"
ON public.deliverables FOR ALL
USING (public.is_platform_staff());

CREATE POLICY "Org members can view and create approvals"
ON public.approvals FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.deliverables d
    WHERE d.id = deliverable_id AND (public.is_org_member(d.organization_id) OR public.is_platform_staff())
  )
);

-- 9. MEDIA ASSETS RLS
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can view their media assets"
ON public.media_assets FOR SELECT
USING (public.is_org_member(organization_id) OR public.is_platform_staff());

CREATE POLICY "Org members can upload media assets"
ON public.media_assets FOR INSERT
WITH CHECK (public.is_org_member(organization_id));

CREATE POLICY "Org admins or staff can delete media assets"
ON public.media_assets FOR DELETE
USING (public.is_org_admin(organization_id) OR public.is_platform_staff());

-- 10. DIGITAL PROFILES RLS
ALTER TABLE public.digital_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published profiles"
ON public.digital_profiles FOR SELECT
USING (status = 'PUBLISHED' OR public.is_org_member(organization_id) OR public.is_platform_staff());

CREATE POLICY "Org admins can manage their digital profile"
ON public.digital_profiles FOR ALL
USING (public.is_org_admin(organization_id) OR public.is_platform_staff());

-- 11. NOTIFICATIONS RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only view their own notifications"
ON public.notifications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications FOR UPDATE
USING (auth.uid() = user_id);

-- 12. LEADS RLS (Public can submit leads, only platform staff can view)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
ON public.leads FOR INSERT
WITH CHECK (TRUE);

CREATE POLICY "Platform staff can view and manage leads"
ON public.leads FOR ALL
USING (public.is_platform_staff());

-- 13. AUDIT LOGS RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Platform staff can view audit logs"
ON public.audit_logs FOR SELECT
USING (public.is_platform_staff());