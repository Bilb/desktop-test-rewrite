export function format(
  phoneNumber: string,
  _options: {
    ourRegionCode: string;
  }
) {
  return phoneNumber;
}

export function parse(
  phoneNumber: string,
  _options: {
    regionCode: string;
  }
): string {
  return phoneNumber;
}

export function normalize(
  phoneNumber: string,
  _options: { regionCode: string }
): string | undefined {
  try {
    if (isValidNumber(phoneNumber)) {
      return phoneNumber;
    }

    return;
  } catch (error) {
    return;
  }
}

function isValidNumber(number: string) {
  // Check if it's hex
  const isHex = number.replace(/[\s]*/g, '').match(/^[0-9a-fA-F]+$/);
  if (!isHex) return false;

  // Check if the pubkey length is 33 and leading with 05 or of length 32
  const len = number.length;
  if ((len !== 33 * 2 || !/^05/.test(number)) && len !== 32 * 2)
    return false;

  return true;
}
