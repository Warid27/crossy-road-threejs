import useAssets from "@/store/asset-store";
export default function sfxSound(row) {
  if (!row) return;

  const baseAssetUrl = useAssets.getState().baseAssetUrl;

  const grassStepSound = new Audio(`${baseAssetUrl}/sound/sfx/grass-step.wav`);
  const asphaltStepSound = new Audio(
    `${baseAssetUrl}/sound/sfx/asphalt-step.wav`
  );

  grassStepSound.preload = "auto";
  asphaltStepSound.preload = "auto";

  let stepSound = null;

  switch (row.type) {
    case "grass":
    case "forest":
      stepSound = grassStepSound;
      break;
    case "car":
    case "truck":
      stepSound = asphaltStepSound;
      break;
    default:
      return;
  }

  stepSound.volume = 0.5;
  stepSound.currentTime = 0;
  stepSound.play();
}
