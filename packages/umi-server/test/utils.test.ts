import { filterRootContainer } from '../src/utils';

describe('utils', () => {
  it('filterRootContainer normal head', () => {
    const beforeHtml = `
      <!DOCTYPE html><html data-reactroot><head><link rel="stylesheet" href="/"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"><script>window.g_useSSR=true;
    window.g_initialData = {"data":{"ssr":"http:\u002F\u002F127.0.0.1:7001","csr":"http:\u002F\u002F127.0.0.1:8000"}};</script><script>window.routerBase = "/";</script></head><body><div id="root"><div class="normal___1KW4T"><h1>Page index</h1><h2>csr: <!-- -->http://127.0.0.1:8000</h2></div></div><script src="/umi.js"></script></body></html>`;
    const newHtml = filterRootContainer(beforeHtml, html => {
      return html.replace('</head>', '<script>console.log(1);</script></head>');
    });
    expect(newHtml).toMatchSnapshot();
  });

  it('filterRootContainer normal body', () => {
    const beforeHtml = `
      <!DOCTYPE html><html data-reactroot><head><link rel="stylesheet" href="/"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"><script>window.g_useSSR=true;
    window.g_initialData = {"data":{"ssr":"http:\u002F\u002F127.0.0.1:7001","csr":"http:\u002F\u002F127.0.0.1:8000"}};</script><script>window.routerBase = "/";</script></head><body><div id="root"><div class="normal___1KW4T"><h1>Page index</h1><h2>csr: <!-- -->http://127.0.0.1:8000</h2></div></div><script src="/umi.js"></script></body></html>`;
    const newHtml = filterRootContainer(beforeHtml, html => {
      return html.replace('</body>', '<script>console.log(1);</script></body>');
    });
    expect(newHtml).toMatchSnapshot();
  });
});
