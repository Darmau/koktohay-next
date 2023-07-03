import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import type { LightboxExternalProps } from "yet-another-react-lightbox";

const Lightbox = dynamic(() => import("@/components/Lightbox"));

export default function useLightbox() {
  const [open, setOpen] = useState(false);
  const [interactive, setInteractive] = useState(false);

  const openLightbox = useCallback(() => {
    setOpen(true);
    setInteractive(true);
  }, []);

  const renderLightbox = useCallback(
    (props?: Omit<LightboxExternalProps, "open" | "close">) =>
      interactive ? (
        <Lightbox open={open} close={() => setOpen(false)} {...props} />
      ) : null,
    [open, interactive]
  );

  return { openLightbox, renderLightbox };
}
