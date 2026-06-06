
CREATE TABLE form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  vorname text,
  nachname text,
  email text NOT NULL,
  unternehmen text NOT NULL,
  website text,
  rolle text,
  importvorgaenge text,
  importvolumen text,
  herkunftslaender text,
  warengruppen text,
  zolldienstleister text,
  letzte_zollpruefung text,
  nachricht text,
  file_urls text[],
  source text NOT NULL DEFAULT 'landing'
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_submissions" ON form_submissions FOR INSERT
  TO anon WITH CHECK (true);
