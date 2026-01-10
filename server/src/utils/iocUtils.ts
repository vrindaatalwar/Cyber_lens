import { IocType } from "../constants/provider.interface";

interface DetectedIoc {
  type: IocType | null;
  ipVersion?: 4 | 6;
}

function detectIocType(ioc: string): DetectedIoc {
    /*
          The utility must support:
              - ip
              - domain
              - url
              - hash
      */
    const value = ioc.trim();

    // ---------- IP (IPv4) ----------
    const ipv4Regex =
        /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

    if (ipv4Regex.test(value)) {
        return {
            type: "ip",
            ipVersion: 4
        };
    }

    // ---------- IP (IPv6) ----------

    const ipv6Regex =
        /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){1,7}:)|(([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2})|(([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3})|(([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4})|(([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5})|([0-9a-fA-F]{1,4}:)((:[0-9a-fA-F]{1,4}){1,6})|(:((:[0-9a-fA-F]{1,4}){1,7}|:)))$/;

    if (ipv6Regex.test(value)) {
        return {
            type: "ip",
            ipVersion: 6
        };
    }

    // ---------- URL ----------
    try {
        const url = new URL(value);
        if (url.protocol === "http:" || url.protocol === "https:") {
            return {
                type: "url"
            };
        }
    } catch {
        // not a URL
    }

    // ---------- Domain ----------
    const domainRegex =
        /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    if (domainRegex.test(value)) {
        return {
            type: "domain"
        };
    }

    // ---------- Hash (MD5 / SHA1 / SHA256) ----------
    const hashRegex =
        /^(?:[a-fA-F0-9]{32}|[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$/;

    if (hashRegex.test(value)) {
        return {
            type: "hash"
        };
    }

    // ------- Does not match anything -------
    return {
        type: null
    };
}

function validateIocType(
    ioc: string,
    selectedType: IocType
): { isValid: boolean; detectedType: DetectedIoc } {
    const detected = detectIocType(ioc);

    return {
        isValid: detected.type === selectedType,
        detectedType: detected
    };
}

export { detectIocType, validateIocType };
