const SvgAuthPanel = () => {
  return (
    <div className="hidden md:flex md:w-[44%] lg:w-[46%] relative overflow-hidden">
      <svg
        viewBox="0 0 480 700"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          {/* Warm amber glow — top right */}
          <radialGradient id="glow-amber" cx="82%" cy="12%" r="55%">
            <stop offset="0%" stopColor="#e8976b" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#e8976b" stopOpacity="0" />
          </radialGradient>
          {/* Rose glow — bottom left */}
          <radialGradient id="glow-rose" cx="14%" cy="82%" r="55%">
            <stop offset="0%" stopColor="#d4849a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#d4849a" stopOpacity="0" />
          </radialGradient>
          {/* Top fade */}
          <linearGradient id="fade-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#170b28" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#170b28" stopOpacity="0" />
          </linearGradient>
          {/* Bottom fade */}
          <linearGradient id="fade-bottom" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#170b28" stopOpacity="0" />
            <stop offset="100%" stopColor="#170b28" stopOpacity="0.65" />
          </linearGradient>
        </defs>

        {/* ── BACKGROUND ── */}
        <rect width="480" height="700" fill="#170b28" />
        <rect width="480" height="700" fill="url(#glow-amber)" />
        <rect width="480" height="700" fill="url(#glow-rose)" />

        {/* ── AMBIENT LAMP CIRCLE — top right ── */}
        <g className="svg-lamp">
          <circle cx="392" cy="98" r="72" fill="none" stroke="#8b67cc" strokeWidth="0.75" strokeOpacity="0.3" />
          <circle cx="392" cy="98" r="52" fill="#e8976b" fillOpacity="0.06" />
          <circle cx="392" cy="98" r="9" fill="#e8976b" fillOpacity="0.45" />
          <circle cx="392" cy="98" r="4" fill="#e8976b" fillOpacity="0.7" />
        </g>

        {/* ── BUBBLE R1 — right, near top ── */}
        <g className="svg-bubble-1">
          <rect x="196" y="142" width="214" height="64" rx="18" fill="#2e1228" stroke="#cc7890" strokeWidth="1" strokeOpacity="0.6" />
          {/* Avatar dot */}
          <circle cx="212" cy="137" r="5" fill="#cc7890" fillOpacity="0.65" />
          {/* Text lines */}
          <rect x="214" y="159" width="144" height="8" rx="4" fill="#cc7890" fillOpacity="0.55" />
          <rect x="214" y="174" width="106" height="8" rx="4" fill="#cc7890" fillOpacity="0.35" />
          <rect x="214" y="189" width="66" height="7" rx="3.5" fill="#e8976b" fillOpacity="0.32" />
        </g>

        {/* ── BUBBLE L1 — left ── */}
        <g className="svg-bubble-2">
          <rect x="36" y="262" width="194" height="58" rx="18" fill="#2a1644" stroke="#8b67cc" strokeWidth="1" strokeOpacity="0.6" />
          {/* Text lines */}
          <rect x="54" y="279" width="130" height="8" rx="4" fill="#8b67cc" fillOpacity="0.6" />
          <rect x="54" y="294" width="94" height="8" rx="4" fill="#8b67cc" fillOpacity="0.35" />
        </g>

        {/* ── BUBBLE R2 — right, wider ── */}
        <g className="svg-bubble-3">
          <rect x="170" y="368" width="244" height="80" rx="18" fill="#2e1228" stroke="#cc7890" strokeWidth="1" strokeOpacity="0.55" />
          {/* Text lines */}
          <rect x="188" y="384" width="170" height="8" rx="4" fill="#cc7890" fillOpacity="0.5" />
          <rect x="188" y="399" width="132" height="8" rx="4" fill="#cc7890" fillOpacity="0.35" />
          <rect x="188" y="414" width="98" height="8" rx="4" fill="#e8976b" fillOpacity="0.38" />
          <rect x="188" y="429" width="60" height="7" rx="3.5" fill="#cc7890" fillOpacity="0.2" />
        </g>

        {/* ── BUBBLE L2 — left, main focal ── */}
        <g className="svg-bubble-4">
          <rect x="36" y="498" width="232" height="68" rx="18" fill="#2a1644" stroke="#8b67cc" strokeWidth="1" strokeOpacity="0.55" />
          {/* Text lines */}
          <rect x="54" y="515" width="162" height="8" rx="4" fill="#8b67cc" fillOpacity="0.55" />
          <rect x="54" y="530" width="118" height="8" rx="4" fill="#8b67cc" fillOpacity="0.35" />
          <rect x="54" y="545" width="80" height="7" rx="3.5" fill="#e8976b" fillOpacity="0.32" />
        </g>

        {/* ── BUBBLE R3 — right, quick reply ── */}
        <g className="svg-bubble-5">
          <rect x="200" y="620" width="162" height="48" rx="18" fill="#2e1228" stroke="#cc7890" strokeWidth="1" strokeOpacity="0.42" />
          <rect x="218" y="636" width="100" height="8" rx="4" fill="#cc7890" fillOpacity="0.44" />
          <rect x="218" y="651" width="66" height="7" rx="3.5" fill="#cc7890" fillOpacity="0.24" />
        </g>

        {/* ── THREAD LINE — dashed, traces the conversation ── */}
        <path
          className="svg-thread"
          d="M 156 206 C 200 245 155 330 108 320 C 75 312 118 390 170 448 C 218 500 138 562 162 566"
          stroke="#8b67cc"
          strokeWidth="1.2"
          strokeOpacity="0.16"
          fill="none"
          strokeDasharray="5 8"
          strokeLinecap="round"
        />

        {/* ── DECORATIVE DOTS ── */}
        {/* Cluster near R1 */}
        <circle cx="428" cy="232" r="4" fill="#e8976b" fillOpacity="0.5" className="svg-dot-a" />
        <circle cx="448" cy="254" r="2.5" fill="#e8976b" fillOpacity="0.3" className="svg-dot-c" />
        {/* Cluster near L1 */}
        <circle cx="56" cy="198" r="3.5" fill="#8b67cc" fillOpacity="0.45" className="svg-dot-b" />
        <circle cx="34" cy="220" r="2" fill="#8b67cc" fillOpacity="0.28" className="svg-dot-e" />
        {/* Cluster mid-right */}
        <circle cx="432" cy="462" r="4" fill="#d4849a" fillOpacity="0.4" className="svg-dot-d" />
        <circle cx="452" cy="480" r="2.5" fill="#d4849a" fillOpacity="0.24" className="svg-dot-b" />
        {/* Cluster mid-left */}
        <circle cx="42" cy="448" r="3.5" fill="#e8976b" fillOpacity="0.34" className="svg-dot-a" />
        {/* Bottom area */}
        <circle cx="152" cy="602" r="3" fill="#8b67cc" fillOpacity="0.4" className="svg-dot-e" />
        <circle cx="462" cy="594" r="3" fill="#d4849a" fillOpacity="0.34" className="svg-dot-c" />
        <circle cx="56" cy="622" r="2" fill="#8b67cc" fillOpacity="0.28" className="svg-dot-d" />

        {/* ── EDGE FADES ── */}
        <rect width="480" height="90" fill="url(#fade-top)" />
        <rect y="560" width="480" height="140" fill="url(#fade-bottom)" />
      </svg>
    </div>
  );
};

export default SvgAuthPanel;
