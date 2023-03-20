# streamdeck-nodecg-custom

![Build/Test](https://github.com/z0w13/streamdeck-nodecg-custom/workflows/Build%2FTest/badge.svg)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fz0w13%2Fstreamdeck-nodecg-custom.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fz0w13%2Fstreamdeck-nodecg-custom?ref=badge_shield)

A repository for use with my NodeCG setup, using the [streamdeck-ts](https://github.com/rweich/streamdeck-ts) library.

## Usage / Setup

### Init
To install all the packages necessary run:
```shell
pnpm install
```

### Build
Build the development-version of the plugin with:
```shell
pnpm build
```
The resulting directory created in the dist directory can be copied into your streamdeck plugin folder as described in the [documentation](https://developer.elgato.com/documentation/stream-deck/sdk/create-your-own-plugin/).

### Release
Start the release by manually by executing the [release workflow](.github/workflows/release.yml) in your GitHub actions.
This will use the current state of the main branch to create a plugin-archive that can be installed using the streamdeck software.

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fz0w13%2Fstreamdeck-nodecg-custom.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fz0w13%2Fstreamdeck-nodecg-custom?ref=badge_large)
