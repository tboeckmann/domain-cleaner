import { DomainCleanerPage } from './app.po';

describe('domain-cleaner App', () => {
  let page: DomainCleanerPage;

  beforeEach(() => {
    page = new DomainCleanerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
