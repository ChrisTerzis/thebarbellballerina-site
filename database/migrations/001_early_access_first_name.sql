-- Run once if `early_access_signups` existed before `first_name` was added.
ALTER TABLE early_access_signups
  ADD COLUMN first_name VARCHAR(120) NOT NULL DEFAULT '' AFTER email;
