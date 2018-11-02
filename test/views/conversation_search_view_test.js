/* global $, Whisper */

describe('ConversationSearchView', () => {
  it('should match partial numbers', () => {
    const $el = $('<div><div class="new-contact contact hide"></div></div>');
    const view = new Whisper.ConversationSearchView({
      el: $el,
      input: $('<input>'),
    }).render();
    const maybeNumbers = [
      '+1 415',
      '+1415',
      '+1415',
      '415',
      '(415)',
      ' (415',
      '(415) 123 4567',
      '+1 (415) 123 4567',
      ' +1 (415) 123 4567',
      '1 (415) 123 4567',
      '1 415-123-4567',
      '415-123-4567',
    ];
    maybeNumbers.forEach(n => {
      assert.ok(view.maybeNumber(n), n);
    });
  });
  describe('Searching for left groups', () => {
    let convo;

    before(() => {
      convo = new Whisper.ConversationCollection().add({
        id: '1-search-view',
        name: 'i left this group',
        members: [],
        type: 'group',
        left: true,
      });

      return window.Signal.Data.saveConversation(convo.attributes, {
        Conversation: Whisper.Conversation,
      });
    });
    describe('with no messages', () => {
      let input;
      let view;

      before(done => {
        input = $('<input>');
        view = new Whisper.ConversationSearchView({ input }).render();
        view.$input.val('left');
        view.filterContacts();
        view.typeahead_view.collection.on('reset', () => {
          done();
        });
      });
      it('should not surface left groups with no messages', () => {
        assert.isUndefined(
          view.typeahead_view.collection.get(convo.id),
          'got left group'
        );
      });
    });
    describe('with messages', () => {
      let input;
      let view;
      before(async () => {
        input = $('<input>');
        view = new Whisper.ConversationSearchView({ input }).render();
        convo.set({ id: '2-search-view', left: false });

        await window.Signal.Data.saveConversation(convo.attributes, {
          Conversation: Whisper.Conversation,
        });

        view.$input.val('left');
        view.filterContacts();

        return new Promise(resolve => {
          view.typeahead_view.collection.on('reset', resolve);
        });
      });
      it('should surface left groups with messages', () => {
        assert.isDefined(
          view.typeahead_view.collection.get(convo.id),
          'got left group'
        );
      });
    });
  });
});
