import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('apply-token', () => {

  it('should save token to localstorage', () => {
    const token = 'someToken';
    browser.get(`${browser.baseUrl}/applyToken#token=${token}`)
      .then(async () => expect(await browser.executeScript(`return window.localStorage.getItem('token')`)).toEqual(token));
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
