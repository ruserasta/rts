-- Seed roles
insert into public.roles (name)
values
('manager'),
('account_manager'),
('graphic_designer'),
('video_editor'),
('photographer')
on conflict (name) do nothing;

-- Example settings
insert into public.settings (key, value)
values
('default_agency_mode', '"full_service"'::jsonb),
('default_weekly_capacity_hours', '40'::jsonb)
on conflict (key) do update set value = excluded.value;

-- Demo clients
insert into public.clients (name, company_name, industry, contact_person, email, phone, service_type, monthly_retainer, start_date, status, notes)
values
('Nexa Homes', 'Nexa Homes LLC', 'Real Estate', 'Lana Patel', 'lana@nexahomes.com', '+1-555-0101', 'Full-service', 12000, '2025-11-01', 'active', 'High-priority launch client'),
('Bloom Wellness', 'Bloom Wellness Inc.', 'Healthcare', 'Mina Carter', 'mina@bloomwellness.com', '+1-555-0102', 'Social media', 9000, '2025-10-15', 'active', 'Strong educational content cadence'),
('Orbit Foods', 'Orbit Foods Co.', 'FMCG', 'Ethan Ross', 'ethan@orbitfoods.com', '+1-555-0103', 'Paid ads', 15000, '2025-09-01', 'on_hold', 'Seasonal spend and campaign relaunch');

-- Demo CRM leads
insert into public.crm_leads (lead_name, company, contact_person, source, email, phone, service_interested, estimated_value, stage, status)
values
('Skyline Clinics', 'Skyline Clinics', 'Noah Lee', 'Referral', 'noah@skylineclinics.com', '+1-555-0191', 'Full-service', 50000, 'qualified', 'open'),
('Harbor Hotels', 'Harbor Hotels Group', 'Ava Moore', 'Inbound', 'ava@harborhotels.com', '+1-555-0192', 'Paid ads', 68000, 'proposal_sent', 'open'),
('Volt Fitness', 'Volt Fitness', 'Luca Martin', 'Event', 'luca@voltfit.com', '+1-555-0193', 'Social media', 36000, 'contacted', 'open');
