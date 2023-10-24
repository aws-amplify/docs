import { getCustomStaticPath } from '@/utils/getCustomStaticPath';
import { PLATFORM_DISPLAY_NAMES } from '@/data/platforms';

export const meta = {
  title: 'Overview',
  description: 'This is a description for the overview page.',
  platforms: ['javascript', 'android']
};

export const getStaticPaths = async () => {
  return getCustomStaticPath(meta.platforms);
};

export function getStaticProps(context) {
  return {
    props: {
      platform: context.params.platform,
      meta
    }
  };
}

const PlatformOverview = ({ platform }) => {
  console.log(platform);
  return (
    <>
      <h1>// Amplify docs for {PLATFORM_DISPLAY_NAMES[platform]}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
        hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet
        vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin
        laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu
        nibh. Nullam mollis. Ut justo. Suspendisse potenti.
      </p>
      <p>
        Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae
        luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing,
        commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit
        tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices
        sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl.
        Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.
      </p>
      <p>
        Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a
        ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero
        dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius,
        adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam
        pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida
        vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu,
        vulputate vel, nisl.
      </p>
      <p>
        Suspendisse mauris. Fusce accumsan mollis eros. Pellentesque a diam sit
        amet mi ullamcorper vehicula. Integer adipiscing risus a sem. Nullam
        quis massa sit amet nibh viverra malesuada. Nunc sem lacus, accumsan
        quis, faucibus non, congue vel, arcu. Ut scelerisque hendrerit tellus.
        Integer sagittis. Vivamus a mauris eget arcu gravida tristique. Nunc
        iaculis mi in ante. Vivamus imperdiet nibh feugiat est.
      </p>
      <p>
        Ut convallis, sem sit amet interdum consectetuer, odio augue aliquam
        leo, nec dapibus tortor nibh sed augue. Integer eu magna sit amet metus
        fermentum posuere. Morbi sit amet nulla sed dolor elementum imperdiet.
        Quisque fermentum. Cum sociis natoque penatibus et magnis xdis
        parturient montes, nascetur ridiculus mus. Pellentesque adipiscing eros
        ut libero. Ut condimentum mi vel tellus. Suspendisse laoreet. Fusce ut
        est sed dolor gravida convallis. Morbi vitae ante. Vivamus ultrices
        luctus nunc. Suspendisse et dolor. Etiam dignissim. Proin malesuada
        adipiscing lacus. Donec metus. Curabitur gravida
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
        hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet
        vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin
        laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu
        nibh. Nullam mollis. Ut justo. Suspendisse potenti.
      </p>
      <p>
        Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae
        luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing,
        commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit
        tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices
        sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl.
        Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.
      </p>
      <p>
        Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a
        ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero
        dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius,
        adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam
        pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida
        vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu,
        vulputate vel, nisl.
      </p>
      <p>
        Suspendisse mauris. Fusce accumsan mollis eros. Pellentesque a diam sit
        amet mi ullamcorper vehicula. Integer adipiscing risus a sem. Nullam
        quis massa sit amet nibh viverra malesuada. Nunc sem lacus, accumsan
        quis, faucibus non, congue vel, arcu. Ut scelerisque hendrerit tellus.
        Integer sagittis. Vivamus a mauris eget arcu gravida tristique. Nunc
        iaculis mi in ante. Vivamus imperdiet nibh feugiat est.
      </p>
      <p>
        Ut convallis, sem sit amet interdum consectetuer, odio augue aliquam
        leo, nec dapibus tortor nibh sed augue. Integer eu magna sit amet metus
        fermentum posuere. Morbi sit amet nulla sed dolor elementum imperdiet.
        Quisque fermentum. Cum sociis natoque penatibus et magnis xdis
        parturient montes, nascetur ridiculus mus. Pellentesque adipiscing eros
        ut libero. Ut condimentum mi vel tellus. Suspendisse laoreet. Fusce ut
        est sed dolor gravida convallis. Morbi vitae ante. Vivamus ultrices
        luctus nunc. Suspendisse et dolor. Etiam dignissim. Proin malesuada
        adipiscing lacus. Donec metus. Curabitur gravida
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
        hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet
        vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin
        laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu
        nibh. Nullam mollis. Ut justo. Suspendisse potenti.
      </p>
      <p>
        Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae
        luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing,
        commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit
        tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices
        sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl.
        Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.
      </p>
      <p>
        Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a
        ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero
        dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius,
        adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam
        pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida
        vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu,
        vulputate vel, nisl.
      </p>
      <p>
        Suspendisse mauris. Fusce accumsan mollis eros. Pellentesque a diam sit
        amet mi ullamcorper vehicula. Integer adipiscing risus a sem. Nullam
        quis massa sit amet nibh viverra malesuada. Nunc sem lacus, accumsan
        quis, faucibus non, congue vel, arcu. Ut scelerisque hendrerit tellus.
        Integer sagittis. Vivamus a mauris eget arcu gravida tristique. Nunc
        iaculis mi in ante. Vivamus imperdiet nibh feugiat est.
      </p>
      <p>
        Ut convallis, sem sit amet interdum consectetuer, odio augue aliquam
        leo, nec dapibus tortor nibh sed augue. Integer eu magna sit amet metus
        fermentum posuere. Morbi sit amet nulla sed dolor elementum imperdiet.
        Quisque fermentum. Cum sociis natoque penatibus et magnis xdis
        parturient montes, nascetur ridiculus mus. Pellentesque adipiscing eros
        ut libero. Ut condimentum mi vel tellus. Suspendisse laoreet. Fusce ut
        est sed dolor gravida convallis. Morbi vitae ante. Vivamus ultrices
        luctus nunc. Suspendisse et dolor. Etiam dignissim. Proin malesuada
        adipiscing lacus. Donec metus. Curabitur gravida
      </p>
    </>
  );
};

export default PlatformOverview;
