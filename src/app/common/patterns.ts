export const Patterns = {
    Email:`[a-zA-Z0-9._%+-]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}$`,
    OnlyArabicLetters:`[\u0600-\u06FF\s]`,
    OnlyEnglishLetters:`^[A-Za-z\s]+$`,
    OnlyNumbers:`^[0-9]*$`,
   // PhoneMobile:`^01[0-2|5]{1}[0-9]{8}$`,
 //  ^(?:00|\\+)[0-9\\s.\\/-]{6,20}$";
    PhoneMobile:`^(?:0|\\+)[0-9]{9,16}`,
    DateMMDDYYYY:`^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$`,
    DateDDMMYYYY:`^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$`,
    Decimal:`^\d*\.\d{1,4}$`
}