import { SocialMedia } from "src/lib/types/sections/generalSettingData";

const youTube = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="16" fill="#00AD99" />
    <mask
      id="mask0_737_8389"
      style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x="7"
      y="9"
      width="18"
      height="14"
    >
      <path
        d="M16 10.1667C23.5 10.1667 23.5 10.1667 23.5 16C23.5 21.8334 23.5 21.8334 16 21.8334C8.5 21.8334 8.5 21.8334 8.5 16C8.5 10.1667 8.5 10.1667 16 10.1667Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.3359 13.0834L19.3359 16L14.3359 18.9167V13.0834Z"
        fill="black"
      />
    </mask>
    <g mask="url(#mask0_737_8389)">
      <path d="M26 6H6V26H26V6Z" fill="white" />
    </g>
  </svg>
);
const x = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="16" fill="#00AD99" />
    <mask
      id="mask0_737_8394"
      style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x="6"
      y="6"
      width="20"
      height="21"
    >
      <path d="M6 6.30078H26V26.3008H6V6.30078Z" fill="white" />
    </mask>
    <g mask="url(#mask0_737_8394)">
      <path
        d="M21.75 7.23828H24.8171L18.1171 14.9154L26 25.364H19.8286L14.9914 19.0283L9.46286 25.364H6.39286L13.5586 17.1497L6 7.23971H12.3286L16.6943 13.0297L21.75 7.23828ZM20.6714 23.524H22.3714L11.4 8.98257H9.57714L20.6714 23.524Z"
        fill="white"
      />
    </g>
  </svg>
);
const facebook = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="16" fill="#00AD99" />
    <path
      d="M18 17.5H20.5L21.5 13.5H18V11.5C18 10.47 18 9.5 20 9.5H21.5V6.14C21.174 6.097 19.943 6 18.643 6C15.928 6 14 7.657 14 10.7V13.5H11V17.5H14V26H18V17.5Z"
      fill="white"
    />
  </svg>
);
const linkedin = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="16" fill="#00AD99" />
    <path
      d="M8.98487 11.197C10.1933 11.197 11.1729 10.2174 11.1729 9.00898C11.1729 7.80058 10.1933 6.82098 8.98487 6.82098C7.77648 6.82098 6.79688 7.80058 6.79688 9.00898C6.79688 10.2174 7.77648 11.197 8.98487 11.197Z"
      fill="white"
    />
    <path
      d="M13.2358 12.855V24.994H17.0047V18.991C17.0047 17.407 17.3027 15.873 19.2667 15.873C21.2037 15.873 21.2277 17.684 21.2277 19.091V24.995H24.9988V18.338C24.9988 15.068 24.2948 12.555 20.4728 12.555C18.6378 12.555 17.4077 13.562 16.9047 14.515H16.8537V12.855H13.2358ZM7.09375 12.855H10.8687V24.994H7.09375V12.855Z"
      fill="white"
    />
  </svg>
);

export function SocialMediaRender({ data }: { data: SocialMedia }) {
  const { target, link } = data;

  let icon = null;
  if (target === "youtube") {
    icon = youTube;
  } else if (target === "linkedin") {
    icon = linkedin;
  } else if (target === "x") {
    icon = x;
  } else if (target === "facebook") {
    icon = facebook;
  }

  return (
    <div>
      {icon && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the company's profile on {${target}}`}
          className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
        >
          {icon}
        </a>
      )}
    </div>
  );
}
