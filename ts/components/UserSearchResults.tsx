import React from 'react';
import { PropsData as ConversationListItemPropsType } from './ConversationListItem';

import classNames from 'classnames';

export type Props = {
  contacts: Array<ConversationListItemPropsType>;
  regionCode: string;
  searchTerm: string;
  selectedContact: number;
  onContactSelected: any;
};

export class UserSearchResults extends React.Component<Props> {
  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const { contacts, searchTerm } = this.props;

    const noResults = !contacts || contacts.length <= 0;

    return (
      <div className="module-search-results">
        {noResults ? (
          <div className="module-search-results__no-results">
            {window.i18n('noSearchResults', [searchTerm])}
          </div>
        ) : (
          this.renderContacts(contacts)
        )}
      </div>
    );
  }

  private renderContacts(items: Array<ConversationListItemPropsType>) {
    return (
      <div className="contacts-dropdown">
        {items.map((contact, index) => this.renderContact(contact, index))}
      </div>
    );
  }

  private renderContact(contact: ConversationListItemPropsType, index: Number) {
    const { profileName, phoneNumber } = contact;
    const { selectedContact } = this.props;

    const shortenedPubkey = window.shortenPubkey(phoneNumber);
    const rowContent = `${profileName} ${shortenedPubkey}`;

    return (
      <div
        className={classNames(
          'contacts-dropdown-row',
          selectedContact === index && 'contacts-dropdown-row-selected'
        )}
        key={contact.phoneNumber}
        onClick={() => this.props.onContactSelected(contact.phoneNumber)}
        role="button"
      >
        {rowContent}
      </div>
    );
  }
}
