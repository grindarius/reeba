```mermaid
erDiagram
  users {
    text user_username PK
    text user_email
    text user_password
    timestamptz user_registration_datetime
    t_user_role user_role
    text user_image_profile_path
    boolean user_verification_status
    text user_phone_country_code
    text user_phone_number
    date user_birthdate
    text user_profile_description
    jsonb user_social_medias
    text user_iso_31662_code
    boolean user_deletion_status
  }
  user_followers {
    text follow_id PK
    text following_username PK
    text followed_username
  }
  events {
    text event_id
    text user_username
    text event_name
    text event_description
    text event_cover_image_path
    text event_website
    text event_venue_name
    point event_venue_coordinates
    timestamptz event_creation_date
    timestamptz event_opening_date
    t_event_status event_status
    jsonb event_ticket_prices
    int event_minimum_age
    event_venue_country_code_alpha2
    int event_min_ticket_price
    int event_max_ticket_price
  }
```
