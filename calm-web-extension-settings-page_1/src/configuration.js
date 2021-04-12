export const configuration = {
  isRedirectEnabled: false,
};

export const ENVIRONMENT = "CHROME";
// export const ENVIRONMENT = "MOCK";

export const redirectDelaySeconds = 14;
export const defaultMaxScrollLength = 1.5 * window.screen.height;
export const SETTINGS_SAVE_KEY = "SMOOTH_GO_SETTINGS_9";
export const SHOULD_SETTINGS_EXIST_KEY = "SMOOTH_GO_SHOULD_SETTINGS_EXIST_9";
export const defaultSettings = {
  linkButtonConfigGroup: [
    {name: "Open Google", links: ["https://google.com"]},
    // {name: "Open Music", links: ["https://music.youtube.com"]},
    {name: "Open Music", links: ["https://pandora.com"]},
    {name: "Open Podcasts", links: ["https://radiopublic.com/"]},
    {
      name: "Open Calm Video",
      links: [
        "https://www.bing.com/videos/search?q=4K+Cab+ride+St.+Moritz+-+Tirano%2c+fresh+snow%2c+strong+winds+%26+snowdrifts+%5b03.2020%5d&&view=detail&mid=A03D128BC5D3BDAA6A19A03D128BC5D3BDAA6A19&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3D4K%2BCab%2Bride%2BSt.%2BMoritz%2B-%2BTirano%252c%2Bfresh%2Bsnow%252c%2Bstrong%2Bwinds%2B%2526%2Bsnowdrifts%2B%255b03.2020%255d%26FORM%3DHDRSC3",
      ],
    },
    {name: "Open Books", links: ["https://play.google.com/books"]},
  ],
  lowValueURLTags: [
    "youtube.com",
    "reddit.com",
    "facebook.com",
    "twitter.com",
    "instagram.com",
    "tiktok.com",
  ],
};

const redirectDestination = "https://radiopublic.com/99pi";
export function getRedirectDestination() {
  return redirectDestination;
}

export const calmVideoUrls = [
  "https://www.youtube.com/embed/videoseries?list=PLBhIaMGFdaG8mlQDFah-23_YT7m0QF5Zi",
];
export const maxZIndex = 9999;
const tmpLowValueSites = [
  "youtube.com",
  "m.khal.me",
  "overdrive.com",
  "reddit.com",
  "tiktok.com",
  "businessinsider.com",
  "google.com",
  "eruda.liriliri.io",
  "eruda",
];
export function getIsSiteLowValue(url) {
  const isSiteNameInUrlGroup = tmpLowValueSites.map((partialSite) => {
    return url.includes(partialSite);
  });
  return isSiteNameInUrlGroup.includes(true);
}

export function getLinkButtonConfigGroup() {
  const defaultLinkButtonConfigGroup = [
    {
      name: "Open Book",
      links: ["https://read.amazon.com", "https://hoopladigital.com"],
    },

    {
      name: "Open Music",
      links: ["https://pandora.com", "https://spotify.com"],
    },

    {
      name: "Open Google",
      links: ["https://bing.com"],
    },

    {
      name: "Open Podcasts",
      links: ["https://radiopublic.com/99pi"],
    },
  ];
  const linkButtonConfigGroup = defaultLinkButtonConfigGroup;
  return linkButtonConfigGroup;
}
