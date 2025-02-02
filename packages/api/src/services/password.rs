use std::fmt::Display;

/// Verifies a given password from user.
///
/// This password verifier verifies that a given password must
/// - Be at least 16 characters long.
/// - Valid ASCII characters.
/// - Have minimum of 1 capital letter
/// - Have minimum of 1 normal letter.
/// - Have minimum of 1 number.
/// - Have minimum of 1 special characters that ASCII supports
pub fn verify_password_integrity(password: &str) -> Result<(), PasswordIntegrityError> {
    // Check non-ascii characters
    if !password.is_ascii() {
        return Err(PasswordIntegrityError::NotAsciiCharacters);
    }

    // Check chars count
    if password.chars().count() < 16 {
        return Err(PasswordIntegrityError::TooShort);
    }

    // For loop to check the other 3 cases.
    let mut small_letter_count = 0;
    let mut special_characters_count = 0;
    let mut numbers_count = 0;

    for c in password.chars() {
        if c.is_ascii_digit() {
            numbers_count += 1;
        } else if c.is_ascii_lowercase() {
            small_letter_count += 1;
        } else if c.is_ascii_punctuation() {
            special_characters_count += 1;
        }
    }

    if numbers_count == 0 {
        return Err(PasswordIntegrityError::MissingNumberRequirement);
    }

    if small_letter_count == 0 {
        return Err(PasswordIntegrityError::MissingSmallLetterRequirement);
    }

    if special_characters_count == 0 {
        return Err(PasswordIntegrityError::MissingSpecialCharacterRequirement);
    }

    Ok(())
}

#[derive(Debug)]
pub enum PasswordIntegrityError {
    TooShort,
    NotAsciiCharacters,
    MissingNumberRequirement,
    MissingSmallLetterRequirement,
    MissingSpecialCharacterRequirement,
}

impl Display for PasswordIntegrityError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Self::TooShort =>
                    "Password too short, minimum length of password should be 16 characters.",
                Self::NotAsciiCharacters => "Password contains non-ascii characters.",
                Self::MissingNumberRequirement => "Password does not have at least 1 number.",
                Self::MissingSmallLetterRequirement =>
                    "Password does not have at least 1 small letter.",
                Self::MissingSpecialCharacterRequirement =>
                    "Password does not have at least 1 species ascii character.",
            }
        )
    }
}
