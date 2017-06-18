import { DealToPage } from './app.po';

describe('deal-to App', () => {
  let page: DealToPage;

  beforeEach(() => {
    page = new DealToPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
