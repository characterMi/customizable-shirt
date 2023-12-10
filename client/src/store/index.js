import { proxy } from "valtio";

export const state = proxy({
  intro: true,
  color: "#efbd48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
});
