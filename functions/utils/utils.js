import sharp from "sharp";

export function isLoggedinAcumatica(AcumaticaSession) {
  return (
    !AcumaticaSession ||
    !AcumaticaSession?.expiration ||
    !AcumaticaSession?.Cookie ||
    new Date(AcumaticaSession.expiration).getTime() < new Date().getTime()
  );
}

export async function loginAcumatica() {
  const res = await fetch(
    `${process.env.ACUMATICA_URL}/${process.env.ACUMATICA_LOGIN_PATH_}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: process.env.NAME,
        password: process.env.PASSWORD,
        tenant: process.env.TENANT,
      }),
    }
  );

  if (!res.ok || res.status !== 204) throw "Error occurs when login";

  if (!global.AcumaticaSession) {
    global["AcumaticaSession"] = {
      expiration: 0,
      Cookie: "",
    };
  }

  // set auth expiration
  for (const key of res.headers.entries()) {
    if (key[0] === "date") {
      const now = new Date(key[1]).getTime();
      // deafult expiration 60mins
      global.AcumaticaSession["expiration"] = now + 60 * 60 * 1000;
      break;
    }
  }

  // set server cookie
  for (const key of res.headers.getSetCookie()) {
    const regex = new RegExp(/^(.*?)\;/);
    global.AcumaticaSession["Cookie"] += key.match(regex)[0];
  }

  return true;
}

export function formatStylesQuery(styles) {
  const list = styles.split(",");
  let query = "";

  // example: "InventoruID eq BBY100013011 or InventoruID eq SSS100049011 or InventoruID eq FKY100101021"
  for (let i = 0; i < list.length; i++) {
    query += "InventoryID eq '" + list[i] + "'";
    if (i !== list.length - 1) query += " or ";
  }
  return query;
}

export async function resizeAndCompressImage(imageBuffer) {
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();

  // check image size widith > 400px or height > 400px
  if (metadata.width > 400 || metadata.height > 400) {
    image
      .resize({ width: 400, height: 400, fit: "contain" })
      .flatten({ background: { r: 0, g: 0, b: 0, alpha: 0 } });
  }

  // check image size > 200kb
  if (metadata.size > 200 * 1024) {
    image.png({ quality: 70 });
  }
  return await image.toBuffer();
}

export function generateTimeStamp() {
  // object tracks time in UTC internally, need to change the timezone
  const now = new Date(
    new Date().toLocaleString("en", { timeZone: "America/New_York" })
  );
  const year = now.getFullYear().toString();
  const month =
    now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
  const date =
    now.getDate() < 10 ? "0" + now.getDate() : now.getDate().toString();
  const hours =
    now.getHours() < 10 ? "0" + now.getHours() : now.getHours().toString();
  const minutes =
    now.getMinutes() < 10
      ? "0" + now.getMinutes()
      : now.getMinutes().toString();
  const seconds =
    now.getSeconds() < 10
      ? "0" + now.getSeconds()
      : now.getSeconds().toString();

  // example: 20240309131523
  return year + month + date + hours + minutes + seconds;
}

export function isPositiveInteger(value) {
  return !Number.isNaN(value) && Number.isInteger(value) && value > 0;
}
