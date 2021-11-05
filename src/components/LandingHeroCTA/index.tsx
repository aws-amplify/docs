import Link from "next/link";
import {PlatformsGroup, CTAContainer} from "./styles";
import InternalLinkButton from "../InternalLinkButton";
import * as img from "../../constants/img";

export default function LandingHeroCTA() {
  return (
    <CTAContainer>
      <InternalLinkButton href="/start/?sc_icampaign=start&sc_ichannel=docs-home">
        <span>Get started for free</span>
      </InternalLinkButton>
      <PlatformsGroup>
        <Link href="/start/q/integration/react?sc_icampaign=react-start&sc_ichannel=docs-home">
          <a>
            <img
              alt={img.REACT.alt}
              height={40}
              width={40}
              src={img.REACT.src}
            />
          </a>
        </Link>
        <Link href="/start/q/integration/vue?sc_icampaign=vue-start&sc_ichannel=docs-home">
          <a>
            <img alt={img.VUE.alt} height={40} width={40} src={img.VUE.src} />
          </a>
        </Link>
        <Link href="/start/q/integration/js?sc_icampaign=js-start&sc_ichannel=docs-home">
          <a>
            <img alt={img.JS.alt} height={40} width={40} src={img.JS.src} />
          </a>
        </Link>
        <Link href="/start/q/integration/ios?sc_icampaign=ios-start&sc_ichannel=docs-home">
          <a>
            <img alt={img.IOS.alt} height={40} width={40} src={img.IOS.src} />
          </a>
        </Link>
        <Link href="/start/q/integration/android?sc_icampaign=android-start&sc_ichannel=docs-home">
          <a>
            <img
              alt={img.ANDROID.alt}
              height={40}
              width={40}
              src={img.ANDROID.src}
            />
          </a>
        </Link>
        <Link href="/start/q/integration/flutter?sc_icampaign=flutter-start&sc_ichannel=docs-home">
          <a>
            <img
              alt={img.FLUTTER.alt}
              height={40}
              width={40}
              src={img.FLUTTER.src}
            />
          </a>
        </Link>
      </PlatformsGroup>
    </CTAContainer>
  );
}
