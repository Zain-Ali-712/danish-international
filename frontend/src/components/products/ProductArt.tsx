import { useId } from "react";
import type { ArtKind } from "@/lib/catalog";

/**
 * Studio-style product illustrations in the site palette: brushed steel, graphite and crimson,
 * lit from the top left with a soft floor shadow. One drawing per kind of instrument; `tag`
 * prints the model on its screen or label so similar products stay distinguishable.
 */
export default function ProductArt({ kind, tag, className = "" }: { kind: ArtKind; tag?: string; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${n}-${uid}`;
  const u = (n: string) => `url(#${id(n)})`;
  const label = { fontFamily: "var(--font-display)", fontWeight: 600 } as const;

  const S = u("steel");
  const SS = u("steelSide");
  const D = u("dark");
  const C = u("crimson");
  const G = u("glass");
  const SC = u("screen");

  const shadow = <ellipse cx="160" cy="208" rx="112" ry="11" fill={u("shadow")} />;

  const art: Record<ArtKind, React.ReactNode> = {
    calibrator: (
      <>
        {shadow}
        <rect x="44" y="116" width="100" height="84" rx="13" fill={SS} />
        <rect x="44" y="112" width="100" height="80" rx="13" fill={S} />
        <rect x="53" y="121" width="82" height="44" rx="7" fill={SC} />
        <text x="94" y="148" textAnchor="middle" fontSize="12" fill="#ff8597" style={label}>
          {tag ?? "CRC"}
        </text>
        <rect x="55" y="174" width="24" height="7" rx="3.5" fill={C} />
        <rect x="85" y="174" width="14" height="7" rx="3.5" fill="#c3c8cf" />
        <path d="M168 74 v112 a46 12 0 0 0 92 0 v-112" fill={SS} />
        <path d="M168 74 v112 a46 12 0 0 0 46 12 v-112 a46 12 0 0 1 -46 -12z" fill="#fff" opacity="0.25" />
        <ellipse cx="214" cy="74" rx="46" ry="12" fill={S} />
        <ellipse cx="214" cy="74" rx="19" ry="5.5" fill="#14171c" />
        <circle cx="214" cy="58" r="34" fill={u("glow")} />
        <rect x="211" y="22" width="6" height="40" rx="3" fill="#8b929c" />
        <rect x="205" y="42" width="18" height="24" rx="5" fill={G} stroke="#fff" strokeOpacity="0.7" />
        <rect x="207" y="52" width="14" height="12" rx="3" fill={C} />
      </>
    ),
    uptake: (
      <>
        {shadow}
        <ellipse cx="180" cy="196" rx="58" ry="10" fill={D} />
        <rect x="174" y="70" width="12" height="124" rx="6" fill={SS} />
        <rect x="196" y="96" width="70" height="52" rx="8" fill={S} />
        <rect x="202" y="102" width="58" height="40" rx="5" fill={SC} />
        <path d="M206 130 l12 -10 l10 6 l14 -16 l12 4" fill="none" stroke="#ff8597" strokeWidth="2" />
        <path d="M180 78 L118 62" stroke="#9aa1ab" strokeWidth="9" strokeLinecap="round" />
        <g transform="rotate(-14 96 62)">
          <rect x="52" y="44" width="72" height="36" rx="10" fill={S} />
          <rect x="44" y="47" width="16" height="30" rx="6" fill={D} />
          <rect x="62" y="58" width="44" height="8" rx="4" fill={C} />
        </g>
      </>
    ),
    lift: (
      <>
        {shadow}
        <path d="M118 96 v92 a42 11 0 0 0 84 0 v-92" fill="#b7703f" />
        <path d="M118 96 v92 a42 11 0 0 0 42 11 v-92 a42 11 0 0 1 -42 -11z" fill="#fff" opacity="0.22" />
        <ellipse cx="160" cy="96" rx="42" ry="11" fill="#d99567" />
        <ellipse cx="160" cy="96" rx="28" ry="7" fill="#5a3218" />
        <rect x="156" y="26" width="8" height="78" rx="4" fill="#8b929c" />
        <rect x="134" y="20" width="52" height="12" rx="6" fill={D} />
        <circle cx="160" cy="80" r="30" fill={u("glow")} />
        <rect x="149" y="66" width="22" height="30" rx="6" fill={G} stroke="#fff" strokeOpacity="0.8" />
        <rect x="152" y="78" width="16" height="15" rx="4" fill={C} />
      </>
    ),
    mask: (
      <>
        {shadow}
        <path d="M64 176 h192 l-14 22 h-164z" fill={D} />
        <path d="M86 176 C86 94 120 52 160 52 C200 52 234 94 234 176z" fill="#eef0f3" />
        <path d="M86 176 C86 94 120 52 160 52 C200 52 234 94 234 176z" fill={u("holes")} />
        <path d="M86 176 C86 94 120 52 160 52 C140 70 128 120 130 176z" fill="#fff" opacity="0.55" />
        <path d="M86 176 C86 94 120 52 160 52 C200 52 234 94 234 176" fill="none" stroke="#c9ced6" strokeWidth="3" />
        <rect x="60" y="168" width="200" height="12" rx="6" fill={C} />
        {tag && (
          <text x="160" y="177.5" textAnchor="middle" fontSize="8.5" fill="#fff" style={label}>
            {tag.toUpperCase()}
          </text>
        )}
      </>
    ),
    board: (
      <>
        {shadow}
        <path d="M40 176 L120 120 H286 L210 186 Z" fill={D} />
        <path d="M40 176 L210 186 V196 L40 186 Z" fill="#0b0d11" />
        <path d="M210 186 L286 120 V130 L210 196 Z" fill="#1b1f27" />
        <path d="M40 176 L120 120 H286 L210 186 Z" fill={u("weave")} opacity="0.6" />
        <path d="M150 140 C150 112 176 102 206 104 C236 106 250 120 248 136 C230 152 182 156 150 140z" fill={S} />
        <path d="M170 136 C172 120 190 114 210 116 C228 118 236 126 234 134" fill="none" stroke="#b6bcc5" strokeWidth="3" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={96 + i * 22} cy={166 - i * 14} r="4" fill={C} />
        ))}
        {tag && (
          <text x="176" y="176" textAnchor="middle" fontSize="10" fill="#ff8597" style={label} transform="skewX(-28) translate(92 0)">
            {tag}
          </text>
        )}
      </>
    ),
    oral: (
      <>
        {shadow}
        <path d="M92 120 C92 72 228 72 228 120 C228 150 206 162 192 150 C182 140 176 126 160 126 C144 126 138 140 128 150 C114 162 92 150 92 120z" fill={G} stroke="#fff" strokeWidth="2" />
        <path d="M104 118 C106 86 214 86 216 118" fill="none" stroke="#fff" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" />
        <rect x="140" y="150" width="40" height="40" rx="10" fill={C} />
        <rect x="150" y="160" width="20" height="5" rx="2.5" fill="#fff" opacity="0.6" />
      </>
    ),
    vial: (
      <>
        {shadow}
        <circle cx="160" cy="128" r="70" fill={u("glow")} />
        <rect x="128" y="64" width="64" height="134" rx="16" fill={G} stroke="#fff" strokeWidth="2.5" />
        <path d="M131 128 Q160 120 189 128 V182 a13 13 0 0 1 -13 13 h-32 a13 13 0 0 1 -13 -13z" fill={C} opacity="0.92" />
        <path d="M131 128 Q160 120 189 128" fill="none" stroke="#ffb3be" strokeWidth="2" />
        <rect x="136" y="70" width="8" height="118" rx="4" fill="#fff" opacity="0.55" />
        <rect x="132" y="40" width="56" height="28" rx="6" fill={S} />
        <rect x="132" y="56" width="56" height="5" fill="#b6bcc5" />
        <rect x="140" y="140" width="40" height="30" rx="4" fill="#fff" opacity="0.92" />
        <text x="160" y="160" textAnchor="middle" fontSize="11" fill="#8e1328" style={label}>
          {tag ?? "PET"}
        </text>
      </>
    ),
    kit: (
      <>
        {shadow}
        <path d="M70 92 L170 70 L262 92 L162 116 Z" fill="#f7f8fa" />
        <path d="M70 92 L162 116 V198 L70 172 Z" fill={S} />
        <path d="M162 116 L262 92 V170 L162 198 Z" fill={SS} />
        <path d="M70 92 L162 116 V128 L70 104 Z" fill={C} />
        <text x="114" y="150" textAnchor="middle" fontSize="13" fill="#3b414a" style={label} transform="skewY(15) translate(0 -30)">
          {tag ?? "KIT"}
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${182 + i * 24} ${118 - i * 6})`}>
            <rect width="16" height="44" rx="5" fill={G} stroke="#fff" strokeWidth="1.5" />
            <rect y="20" width="16" height="22" rx="4" fill={C} opacity="0.85" />
            <rect y="-8" width="16" height="10" rx="3" fill="#8b929c" />
          </g>
        ))}
      </>
    ),
    dosimeter: (
      <>
        {shadow}
        <rect x="108" y="60" width="104" height="140" rx="26" fill={SS} />
        <rect x="104" y="54" width="104" height="140" rx="26" fill={S} />
        <rect x="118" y="72" width="76" height="52" rx="8" fill={SC} />
        <text x="156" y="96" textAnchor="middle" fontSize="15" fill="#ff8597" style={label}>
          0.42
        </text>
        <text x="156" y="113" textAnchor="middle" fontSize="8" fill="#aab0b9" style={label}>
          µSv/h
        </text>
        <circle cx="156" cy="152" r="14" fill={D} />
        <circle cx="156" cy="152" r="5" fill={C} />
        <circle cx="190" cy="66" r="5" fill="#e2324f" />
        <circle cx="190" cy="66" r="12" fill={u("glow")} />
        {tag && (
          <text x="156" y="184" textAnchor="middle" fontSize="9" fill="#5c636d" style={label}>
            {tag}
          </text>
        )}
      </>
    ),
    survey: (
      <>
        {shadow}
        <path d="M200 150 C240 160 250 196 286 190" fill="none" stroke="#3b414a" strokeWidth="5" />
        <rect x="254" y="168" width="44" height="18" rx="9" fill={D} transform="rotate(-8 276 177)" />
        <rect x="60" y="96" width="150" height="96" rx="20" fill={SS} />
        <rect x="56" y="90" width="150" height="96" rx="20" fill={S} />
        <path d="M92 90 V60 a12 12 0 0 1 12 -12 h54 a12 12 0 0 1 12 12 V90" fill="none" stroke={D} strokeWidth="14" />
        <rect x="70" y="104" width="86" height="56" rx="8" fill={SC} />
        <path d="M82 148 A32 32 0 0 1 144 148" fill="none" stroke="#4b525c" strokeWidth="4" />
        <path d="M113 148 L132 122" stroke="#ff8597" strokeWidth="3" strokeLinecap="round" />
        <circle cx="113" cy="148" r="4" fill="#ff8597" />
        <circle cx="180" cy="120" r="9" fill={C} />
        <circle cx="180" cy="146" r="9" fill={D} />
        {tag && (
          <text x="113" y="176" textAnchor="middle" fontSize="9" fill="#5c636d" style={label}>
            {tag}
          </text>
        )}
      </>
    ),
    beacon: (
      <>
        {shadow}
        <circle cx="160" cy="92" r="78" fill={u("glow")} />
        <rect x="112" y="150" width="96" height="48" rx="10" fill={D} />
        <rect x="120" y="160" width="80" height="16" rx="4" fill={SC} />
        <rect x="124" y="138" width="72" height="16" rx="6" fill={S} />
        <path d="M128 140 C128 82 192 82 192 140z" fill={C} />
        <path d="M138 134 C138 100 156 92 166 92" fill="none" stroke="#ffb3be" strokeWidth="5" strokeLinecap="round" />
        <g transform="translate(160 190)" fill="#ff8597">
          <circle r="2.5" />
        </g>
      </>
    ),
    probe: (
      <>
        {shadow}
        <rect x="70" y="128" width="170" height="64" rx="14" fill={SS} />
        <rect x="66" y="122" width="170" height="64" rx="14" fill={S} />
        <rect x="76" y="132" width="150" height="44" rx="8" fill={D} />
        <rect x="76" y="132" width="150" height="44" rx="8" fill={u("grid")} />
        <rect x="128" y="62" width="64" height="62" rx="12" fill={D} />
        <rect x="136" y="70" width="48" height="30" rx="5" fill={SC} />
        <text x="160" y="90" textAnchor="middle" fontSize="11" fill="#ff8597" style={label}>
          {tag ?? "cps"}
        </text>
        <circle cx="160" cy="112" r="5" fill={C} />
      </>
    ),
    reader: (
      <>
        {shadow}
        <path d="M54 110 L110 86 H274 L218 110 Z" fill="#f7f8fa" />
        <rect x="54" y="110" width="164" height="88" rx="6" fill={S} />
        <path d="M218 110 L274 86 V172 L218 198 Z" fill={SS} />
        <rect x="66" y="122" width="78" height="40" rx="6" fill={SC} />
        <text x="105" y="147" textAnchor="middle" fontSize="11" fill="#ff8597" style={label}>
          {tag ?? "READ"}
        </text>
        <rect x="66" y="172" width="140" height="14" rx="4" fill={D} />
        <rect x="154" y="124" width="52" height="8" rx="4" fill={C} />
        <rect x="154" y="138" width="36" height="8" rx="4" fill="#c3c8cf" />
      </>
    ),
    cards: (
      <>
        {shadow}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`rotate(${-14 + i * 14} 160 190)`}>
            <rect x="112" y="60" width="96" height="130" rx="12" fill={i === 2 ? S : SS} stroke="#fff" strokeWidth="1.5" />
            <rect x="122" y="70" width="76" height="16" rx="4" fill={i === 2 ? C : "#b6bcc5"} />
            {[0, 1, 2, 3].map((k) => (
              <circle key={k} cx={138 + (k % 2) * 44} cy={110 + Math.floor(k / 2) * 40} r="11" fill={D} />
            ))}
          </g>
        ))}
      </>
    ),
    tank: (
      <>
        {shadow}
        <path d="M70 84 L150 56 L262 84 L182 116 Z" fill="#dfe6ec" opacity="0.7" />
        <path d="M70 84 L182 116 V200 L70 168 Z" fill={G} stroke="#fff" strokeWidth="1.5" />
        <path d="M182 116 L262 84 V168 L182 200 Z" fill={G} stroke="#fff" strokeWidth="1.5" />
        <path d="M70 110 L182 142 L262 110" fill="none" stroke="#8fb3c9" strokeOpacity="0.8" strokeWidth="2" />
        <path d="M70 110 L182 142 V200 L70 168 Z" fill="#9cc3d8" opacity="0.28" />
        <path d="M182 142 L262 110 V168 L182 200 Z" fill="#9cc3d8" opacity="0.2" />
        <path d="M70 84 L150 56 L262 84" fill="none" stroke={D} strokeWidth="6" />
        <rect x="150" y="70" width="8" height="74" rx="4" fill="#3b414a" />
        <circle cx="154" cy="148" r="22" fill={u("glow")} />
        <rect x="146" y="140" width="16" height="16" rx="5" fill={C} />
      </>
    ),
    array: (
      <>
        {shadow}
        <path d="M44 150 L150 96 L282 128 L176 186 Z" fill={S} />
        <path d="M44 150 L176 186 V198 L44 162 Z" fill={SS} />
        <path d="M176 186 L282 128 V140 L176 198 Z" fill="#9aa1ab" />
        <path d="M84 146 L150 112 L240 134 L174 170 Z" fill={SC} />
        {Array.from({ length: 36 }).map((_, k) => {
          const r = Math.floor(k / 6);
          const c = k % 6;
          const x = 100 + c * 15 + r * 7.4 - 8;
          const y = 140 - c * 6.4 + r * 4.6 - 14;
          const hot = Math.hypot(c - 2.5, r - 2.5) < 1.8;
          return <circle key={k} cx={x + 20} cy={y + 8} r="2.6" fill={hot ? "#e2324f" : "#4b525c"} />;
        })}
        {tag && (
          <text x="88" y="178" fontSize="10" fill="#5c636d" style={label} transform="rotate(15 88 178)">
            {tag}
          </text>
        )}
      </>
    ),
    software: (
      <>
        {shadow}
        <rect x="146" y="176" width="28" height="22" fill="#9aa1ab" />
        <rect x="116" y="194" width="88" height="8" rx="4" fill={D} />
        <rect x="52" y="44" width="216" height="136" rx="14" fill={D} />
        <rect x="60" y="52" width="200" height="120" rx="8" fill="#f5f6f8" />
        <rect x="60" y="52" width="200" height="18" rx="8" fill="#e1e4e8" />
        <text x="72" y="65" fontSize="9" fill="#3b414a" style={label}>
          {tag ?? "QA"}
        </text>
        <path d="M74 150 L104 128 L132 136 L164 102 L196 112 L244 82" fill="none" stroke="#c41e3a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M74 150 L104 140 L132 144 L164 128 L196 132 L244 118" fill="none" stroke="#aab0b9" strokeWidth="2" strokeDasharray="4 4" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={74 + i * 44} y="156" width="34" height="8" rx="4" fill={i === 0 ? C : "#d6dae0"} />
        ))}
      </>
    ),
    chamber: (
      <>
        {shadow}
        <path d="M60 176 C110 196 150 150 196 158" fill="none" stroke="#3b414a" strokeWidth="6" strokeLinecap="round" />
        <g transform="rotate(-24 200 120)">
          <rect x="176" y="110" width="58" height="22" rx="6" fill={D} />
          <rect x="226" y="104" width="14" height="34" rx="5" fill={SS} />
          <path d="M240 108 H274 a13 13 0 0 1 0 26 H240z" fill={S} />
          <rect x="246" y="112" width="20" height="4" rx="2" fill="#fff" opacity="0.8" />
          <rect x="196" y="116" width="22" height="10" rx="3" fill={C} />
        </g>
        <circle cx="262" cy="96" r="30" fill={u("glow")} />
        {tag && (
          <text x="110" y="120" textAnchor="middle" fontSize="15" fill="#3b414a" style={label}>
            {tag}
          </text>
        )}
      </>
    ),
    cylinder: (
      <>
        {shadow}
        <path d="M120 60 H200 a66 66 0 0 1 0 132 H120z" fill={SS} />
        <circle cx="120" cy="126" r="66" fill={S} />
        <circle cx="120" cy="126" r="66" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx="120" cy="126" r="54" fill="none" stroke="#c9ced6" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const fills = ["#14171c", "#3b414a", "#c41e3a", "#8b929c", "#fbfbfc", "#e2324f"];
          return <circle key={i} cx={120 + Math.cos(a) * 34} cy={126 + Math.sin(a) * 34} r="9" fill={fills[i]} stroke="#b6bcc5" />;
        })}
        <circle cx="120" cy="126" r="10" fill="none" stroke="#3b414a" strokeDasharray="2 3" />
        {tag && (
          <text x="232" y="132" textAnchor="middle" fontSize="11" fill="#5c636d" style={label}>
            {tag}
          </text>
        )}
      </>
    ),
    mammo: (
      <>
        {shadow}
        <path d="M60 180 L60 120 H200 a64 60 0 0 1 0 60 Z" fill={SS} />
        <path d="M60 120 L100 92 H236 a60 30 0 0 1 -36 28 Z" fill="#f7f8fa" />
        <path d="M60 120 H200 a64 60 0 0 1 0 60 H60z" fill={S} />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={84 + i * 26} cy={150} r={3 + i * 1.6} fill={i === 4 ? "#c41e3a" : "#3b414a"} opacity={0.4 + i * 0.12} />
        ))}
        <rect x="80" y="130" width="80" height="4" rx="2" fill="#b6bcc5" />
        {tag && (
          <text x="150" y="112" textAnchor="middle" fontSize="10" fill="#5c636d" style={label}>
            {tag}
          </text>
        )}
      </>
    ),
    nm: (
      <>
        {shadow}
        <ellipse cx="160" cy="80" rx="76" ry="22" fill="#eef1f4" />
        <path d="M84 80 V172 a76 22 0 0 0 152 0 V80" fill={G} stroke="#fff" strokeWidth="1.5" />
        <path d="M84 120 V172 a76 22 0 0 0 152 0 V120 a76 22 0 0 1 -152 0" fill="#9cc3d8" opacity="0.3" />
        {[
          [124, 130, 8],
          [150, 120, 10],
          [182, 124, 13],
          [206, 140, 16],
          [140, 152, 6],
          [172, 156, 7],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? C : "#3b414a"} opacity={i % 2 ? 0.9 : 0.55} />
        ))}
        <ellipse cx="160" cy="80" rx="76" ry="22" fill="none" stroke={D} strokeWidth="5" />
        {tag && (
          <text x="160" y="84" textAnchor="middle" fontSize="11" fill="#3b414a" style={label}>
            {tag}
          </text>
        )}
      </>
    ),
    flood: (
      <>
        {shadow}
        <path d="M46 150 L150 100 L278 128 L174 182 Z" fill={D} />
        <path d="M46 150 L174 182 V194 L46 162 Z" fill="#0b0d11" />
        <path d="M174 182 L278 128 V140 L174 194 Z" fill="#1b1f27" />
        <path d="M70 148 L150 110 L254 132 L174 172 Z" fill={u("glowFlat")} />
        <path d="M70 148 L150 110 L254 132 L174 172 Z" fill={u("grid")} opacity="0.5" />
        <rect x="134" y="72" width="52" height="16" rx="8" fill={S} />
        <path d="M144 88 V104 M176 88 V108" stroke="#8b929c" strokeWidth="5" />
        {tag && (
          <text x="230" y="168" textAnchor="middle" fontSize="11" fill="#ff8597" style={label}>
            {tag}
          </text>
        )}
      </>
    ),
    capsule: (
      <>
        {shadow}
        <circle cx="160" cy="124" r="74" fill={u("glow")} />
        <g transform="rotate(-18 160 128)">
          <rect x="74" y="104" width="172" height="48" rx="24" fill={SS} />
          <rect x="74" y="100" width="172" height="48" rx="24" fill={S} />
          <rect x="92" y="108" width="136" height="6" rx="3" fill="#fff" opacity="0.8" />
          <rect x="130" y="116" width="60" height="22" rx="11" fill={C} />
          <rect x="74" y="100" width="22" height="48" rx="11" fill="#9aa1ab" />
          {tag && (
            <text x="160" y="131.5" textAnchor="middle" fontSize="10" fill="#fff" style={label}>
              {tag}
            </text>
          )}
        </g>
        <g transform="translate(236 176)" fill="#c41e3a">
          <circle r="4" />
          {[0, 120, 240].map((a) => (
            <path key={a} d="M0 0 L-7 -12 A14 14 0 0 1 7 -12 Z" transform={`rotate(${a})`} opacity="0.85" />
          ))}
        </g>
      </>
    ),
    ipg: (
      <>
        {shadow}
        <path d="M206 92 C246 78 270 96 262 128" fill="none" stroke="#3b414a" strokeWidth="4" />
        <path d="M206 102 C240 96 276 112 282 150" fill="none" stroke="#3b414a" strokeWidth="4" />
        <rect x="84" y="74" width="130" height="42" rx="14" fill={G} stroke="#fff" strokeWidth="1.5" />
        <rect x="96" y="86" width="46" height="8" rx="4" fill={C} />
        <rect x="150" y="86" width="46" height="8" rx="4" fill={C} />
        <path d="M70 116 H226 a20 20 0 0 1 20 20 v20 a44 44 0 0 1 -44 44 H114 a44 44 0 0 1 -44 -44 v-20 a20 20 0 0 1 0 -20z" fill={SS} />
        <path d="M66 110 H222 a20 20 0 0 1 20 20 v20 a44 44 0 0 1 -44 44 H110 a44 44 0 0 1 -44 -44 v-20 a20 20 0 0 1 0 -20z" fill={S} />
        <ellipse cx="124" cy="140" rx="34" ry="12" fill="#fff" opacity="0.55" />
        <text x="154" y="170" textAnchor="middle" fontSize="11" fill="#5c636d" style={label}>
          PINS{tag ? ` · ${tag}` : ""}
        </text>
      </>
    ),
    lead: (
      <>
        {shadow}
        <path
          d="M44 182 C90 196 120 150 96 120 C72 90 120 64 160 82 C200 100 226 76 236 52"
          fill="none"
          stroke="#3b414a"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path d="M44 182 C90 196 120 150 96 120 C72 90 120 64 160 82 C200 100 226 76 236 52" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="2" />
        <g transform="rotate(-58 246 40)">
          <rect x="232" y="34" width="60" height="12" rx="6" fill="#3b414a" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={240 + i * 12} y="32" width="7" height="16" rx="2" fill={i % 2 ? S : C} />
          ))}
        </g>
        <circle cx="262" cy="22" r="26" fill={u("glow")} />
        {tag && (
          <text x="70" y="160" textAnchor="middle" fontSize="11" fill="#5c636d" style={label}>
            {tag}
          </text>
        )}
      </>
    ),
  };

  return (
    <svg viewBox="0 0 320 240" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id("steel")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#e7eaee" />
          <stop offset="100%" stopColor="#c8cdd5" />
        </linearGradient>
        <linearGradient id={id("steelSide")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d9dde3" />
          <stop offset="100%" stopColor="#9fa6b0" />
        </linearGradient>
        <linearGradient id={id("dark")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b414a" />
          <stop offset="100%" stopColor="#14171c" />
        </linearGradient>
        <linearGradient id={id("crimson")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ec4f69" />
          <stop offset="100%" stopColor="#9b1530" />
        </linearGradient>
        <linearGradient id={id("glass")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#d5dbe2" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id={id("screen")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#262b34" />
          <stop offset="100%" stopColor="#0b0d11" />
        </linearGradient>
        <radialGradient id={id("glow")}>
          <stop offset="0%" stopColor="#e2324f" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#e2324f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("glowFlat")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e2324f" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8e1328" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id={id("shadow")}>
          <stop offset="0%" stopColor="#0e1116" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0e1116" stopOpacity="0" />
        </radialGradient>
        <pattern id={id("holes")} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="2" fill="#aeb4bd" />
        </pattern>
        <pattern id={id("weave")} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="4" height="8" fill="#ffffff" opacity="0.06" />
        </pattern>
        <pattern id={id("grid")} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0 H0 V10" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" />
        </pattern>
      </defs>
      {art[kind]}
    </svg>
  );
}
