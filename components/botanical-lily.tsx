type BotanicalLilyProps = {
  className?: string;
};

export default function BotanicalLily({ className }: BotanicalLilyProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 300 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="lily-stem"
        d="M151 446C155 356 144 277 151 166"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        className="lily-leaf lily-leaf-left"
        d="M151 350C117 313 71 305 39 318C68 356 109 369 151 350Z"
        fill="#81907A"
        stroke="#687A65"
        strokeWidth="1.4"
      />
      <path
        className="lily-leaf lily-leaf-right"
        d="M150 294C180 249 222 235 258 243C238 286 198 308 150 294Z"
        fill="#8A987F"
        stroke="#687A65"
        strokeWidth="1.4"
      />
      <path d="M50 321C86 326 117 338 145 350M249 247C213 263 183 279 153 294" stroke="#D4DDC8" strokeOpacity=".7" strokeWidth="1.2" />
      <path className="lily-bud" d="M151 177C121 156 129 111 151 91C173 113 181 155 151 177Z" fill="#E8E6D8" stroke="#C8CDB9" strokeWidth="1.5" />
      <g className="lily-petals">
        <path className="lily-petal" d="M151 177C112 165 91 119 102 69C133 91 151 128 151 177Z" fill="#F8F6EA" stroke="#D9DCCB" strokeWidth="1.4" />
        <path className="lily-petal" d="M151 177C126 133 135 87 165 45C181 91 174 139 151 177Z" fill="#FFFDF4" stroke="#D9DCCB" strokeWidth="1.4" />
        <path className="lily-petal" d="M151 177C157 124 190 87 239 72C230 122 201 158 151 177Z" fill="#F8F6EA" stroke="#D9DCCB" strokeWidth="1.4" />
        <path className="lily-petal" d="M151 177C190 152 232 159 272 191C225 210 183 204 151 177Z" fill="#FFFDF4" stroke="#D9DCCB" strokeWidth="1.4" />
        <path className="lily-petal" d="M151 177C191 186 216 223 214 271C178 247 158 214 151 177Z" fill="#F8F6EA" stroke="#D9DCCB" strokeWidth="1.4" />
        <path className="lily-petal" d="M151 177C139 223 106 248 60 246C86 207 118 185 151 177Z" fill="#FFFDF4" stroke="#D9DCCB" strokeWidth="1.4" />
        <path d="M151 177C151 131 149 96 146 72M151 177C128 139 116 111 110 89M151 177C187 147 211 123 227 98M151 177C195 180 224 185 252 195M151 177C171 214 185 239 201 257M151 177C120 199 96 218 75 237" stroke="#D9DCCB" strokeOpacity=".8" strokeWidth="1" />
      </g>
      <g className="lily-stamens" stroke="#B69A67" strokeWidth="1.8" strokeLinecap="round">
        <path d="M149 174L125 135M152 174L143 126M155 174L163 130M158 175L182 140" />
        <circle cx="124" cy="133" r="3.2" fill="#C7A773" stroke="none" />
        <circle cx="142" cy="124" r="3.2" fill="#C7A773" stroke="none" />
        <circle cx="164" cy="128" r="3.2" fill="#C7A773" stroke="none" />
        <circle cx="184" cy="138" r="3.2" fill="#C7A773" stroke="none" />
      </g>
    </svg>
  );
}
