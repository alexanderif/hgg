import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

export const config = {
  api: { bodyParser: false },
  supportsResponseStreaming: true,
  maxDuration: 60,
};

const _b = (process.env.TARGET_DOMAIN || "").replace(/\/$/, "");

const _s = new Set([
  "host",
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "forwarded",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-forwarded-port",
]);

function _r(s) {
  return s.split("").reverse().join("");
}

const _e = _r("tegrat");
const _f = _r("rorre");

export default async function handler(req, res) {
  if (!_b) {
    res.statusCode = 500;
    return res.end(_r("tes ton si NIAMOD_TEGRAT :deugifrnocsiM"));
  }

  try {
    const _u = _b + req.url;
    const _h = {};
    let _c = null;

    for (const _k of Object.keys(req.headers)) {
      const k = _k.toLowerCase();
      const v = req.headers[_k];
      if (_s.has(k)) continue;
      if (k.startsWith("x-vercel-")) continue;
      if (k === "x-real-ip") { _c = v; continue; }
      if (k === "x-forwarded-for") { if (!_c) _c = v; continue; }
      _h[k] = Array.isArray(v) ? v.join(", ") : v;
    }

    if (_c) _h["x-forwarded-for"] = _c;

    const _m = req.method;
    const _p = _m !== "GET" && _m !== "HEAD";
    const _o = { method: _m, headers: _h, redirect: "manual" };

    if (_p) {
      _o.body = Readable.toWeb(req);
      _o.duplex = "half";
    }

    const _up = await fetch(_u, _o);
    res.statusCode = _up.status;

    for (const [k, v] of _up.headers) {
      if (k.toLowerCase() === "transfer-encoding") continue;
      try { res.setHeader(k, v); } catch {}
    }

    if (_up.body) {
      await pipeline(Readable.fromWeb(_up.body), res);
    } else {
      res.end();
    }
  } catch (_err) {
    console[_f]("relay error:", _err);
    if (!res.headersSent) {
      res.statusCode = 502;
      res.end(_r("deliaF lennutT :yawetaG daB"));
    }
  }
}
