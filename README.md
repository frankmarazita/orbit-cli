# Orbit CLI

A very basic implementation of a CLI for the [Orbit](https://orbitbymozilla.com/) AI chatbot by Mozilla.

This is just a simple POC and is not planning on being a full implementation.

## Usage

```bash
bun start
```

## Notes

Reverse engineering efforts were mainly conducted by investigating the network requests made by the Orbit AI chatbot extension for Firefox.

Inspecting of the extension's network requests can be done by opening the debugging menu in Firefox here: [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)

There are likely quite a few bugs in this implementation, as it is a very basic POC that was whipped up in about an hour.

## License

MIT
