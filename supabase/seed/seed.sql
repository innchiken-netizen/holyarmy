-- ============================================================
-- HOLY.ARMY DEVELOPMENT SEED DATA
-- ============================================================

-- 1. PLANS
INSERT INTO public.plans (
    id, name, code, description, price_monthly, price_annual, currency, is_active, 
    features, max_visual_requests_monthly, max_video_requests_monthly, 
    max_revisions_per_request, storage_limit_bytes, team_seats_limit, support_level, has_priority_queue
) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'Essentiel',
    'essentiel',
    'La force de frappe digitale de base pour structurer votre communication dominicale.',
    99000, -- 990.00 EUR
    990000, -- 9,900.00 EUR / an (2 mois offerts)
    'EUR',
    TRUE,
    '["Visuels pour cultes dominicaux", "Templates réseaux sociaux", "Flyers d''évènements", "Bio-page pasteur standard", "Support sous 48h"]'::jsonb,
    10,
    1,
    3,
    10737418240, -- 10 GB
    2,
    'STANDARD',
    FALSE
),
(
    '00000000-0000-0000-0000-000000000002',
    'Impact',
    'impact',
    'Pour les églises en pleine expansion exigeant une communication créative omnicanale.',
    199000, -- 1,990.00 EUR
    1990000, -- 19,900.00 EUR / an
    'EUR',
    TRUE,
    '["Demandes visuelles prioritaires", "Motion flyers & reels vidéo", "Campagnes d''évènements complètes", "Bio-page pasteur personnalisée", "Modifications illimitées", "Support dédié sous 24h"]'::jsonb,
    25,
    4,
    99,
    53687091200, -- 50 GB
    5,
    'PRIORITY',
    TRUE
),
(
    '00000000-0000-0000-0000-000000000003',
    'Strike Force',
    'strike_force',
    'Votre département média et marketing complet externalisé auprès de directeurs artistiques chevronnés.',
    399000, -- 3,990.00 EUR
    3990000, -- 39,900.00 EUR / an
    'EUR',
    TRUE,
    '["Production visuelle illimitée", "Montage vidéo prédication & clips viraux", "Directeur artistique dédié", "Stratégie de marque complète", "Campagnes publicitaires Meta/Google", "Bio-page sur-mesure", "SLA 12h & ligne directe"]'::jsonb,
    999,
    12,
    99,
    268435456000, -- 250 GB
    15,
    'DEDICATED',
    TRUE
)
ON CONFLICT (code) DO NOTHING;

-- 2. SAMPLE PROFILES
-- Note: In production Supabase, profiles are linked to auth.users. 
-- For development seeding, we insert test profiles with fixed UUIDs.
INSERT INTO public.profiles (id, email, full_name, platform_role, is_suspended)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'admin@holy.army', 'Directeur Holy Army', 'SUPER_ADMIN', FALSE),
    ('a0000000-0000-0000-0000-000000000002', 'staff@holy.army', 'Directeur Artistique', 'STAFF', FALSE),
    ('b0000000-0000-0000-0000-000000000001', 'pasteur.paul@eglise-reveil.org', 'Pasteur Paul Mukendi', NULL, FALSE),
    ('b0000000-0000-0000-0000-000000000002', 'com@eglise-reveil.org', 'Sarah Lumumba (Com)', NULL, FALSE),
    ('c0000000-0000-0000-0000-000000000001', 'contact@impact-centre.org', 'Pasteur David Kouassi', NULL, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 3. SAMPLE ORGANIZATIONS
INSERT INTO public.organizations (id, name, slug, church_type, pastor_name, country, city)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Centre Réveil & Vie', 'centre-reveil-vie', 'Église Évangélique', 'Pasteur Paul Mukendi', 'France', 'Paris'),
    ('22222222-2222-2222-2222-222222222222', 'Impact Centre Chrétien', 'impact-centre', 'Église Multiculturelle', 'Pasteur David Kouassi', 'Belgique', 'Bruxelles')
ON CONFLICT (id) DO NOTHING;

-- 4. ORGANIZATION MEMBERS
INSERT INTO public.organization_members (organization_id, user_id, role)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'b0000000-0000-0000-0000-000000000001', 'OWNER'),
    ('11111111-1111-1111-1111-111111111111', 'b0000000-0000-0000-0000-000000000002', 'ADMIN'),
    ('22222222-2222-2222-2222-222222222222', 'c0000000-0000-0000-0000-000000000001', 'OWNER')
ON CONFLICT (organization_id, user_id) DO NOTHING;

-- 5. SUBSCRIPTIONS
INSERT INTO public.subscriptions (
    organization_id, plan_id, status, current_period_start, current_period_end, payment_method
) VALUES 
    ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000002', 'ACTIVE', NOW() - INTERVAL '10 days', NOW() + INTERVAL '20 days', 'STRIPE'),
    ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000001', 'PAYMENT_PENDING', NOW(), NOW() + INTERVAL '30 days', 'MANUAL')
ON CONFLICT (organization_id) DO NOTHING;

-- 6. DIGITAL PROFILES
INSERT INTO public.digital_profiles (
    organization_id, slug, display_name, pastor_name, church_name, bio, template_id, status,
    location, contact_email, whatsapp_number, custom_links, sermons, events
) VALUES 
(
    '11111111-1111-1111-1111-111111111111',
    'paulmukendi',
    'Pasteur Paul Mukendi',
    'Paul Mukendi',
    'Centre Réveil & Vie',
    'Porteur d''un message de foi vivante, d''édification et de puissance du Saint-Esprit. Ministre de l''Évangile depuis plus de 20 ans.',
    'minimal-editorial',
    'PUBLISHED',
    'Paris, France',
    'secretariat@reveilvie.org',
    '+33600112233',
    '[{"title": "Écouter le podcast Foi & Vie", "url": "https://spotify.com", "icon": "podcast"}, {"title": "Faire un don en ligne", "url": "https://reveilvie.org/don", "icon": "heart"}]'::jsonb,
    '[{"title": "Demeurer inébranlable dans la tempête", "url": "https://youtube.com/watch?v=sample1", "date": "Dimanche dernier"}]'::jsonb,
    '[{"title": "Culte d''Impact & Guérison", "date": "Ce Dimanche 10h00", "location": "Auditorium Principal"}]'::jsonb
),
(
    '22222222-2222-2222-2222-222222222222',
    'davidkouassi',
    'Pasteur David Kouassi',
    'David Kouassi',
    'Impact Centre Chrétien',
    'Passionné par l''implantation d''églises locales fortes et la formation des leaders de demain.',
    'bold-ministry',
    'PUBLISHED',
    'Bruxelles, Belgique',
    'contact@impact-centre.org',
    '+32470123456',
    '[{"title": "Nos cultes en direct", "url": "https://youtube.com/@impact", "icon": "video"}]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
)
ON CONFLICT (organization_id) DO NOTHING;