import LightboxComponent, { LightboxExternalProps } from 'yet-another-react-lightbox';
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function Lightbox(props: LightboxExternalProps) {
  return <LightboxComponent {...props} plugins={[Thumbnails, Zoom]} />;
}