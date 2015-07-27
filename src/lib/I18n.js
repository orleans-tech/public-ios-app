/* @flow */

'use strict';

var I18n = require('react-native-i18n');
// Force to french
// var deviceLocale = require('react-native').NativeModules.RNI18n.locale;

I18n.defaultLocale = 'fr';
I18n.locale = 'fr';
I18n.fallbacks = true;

I18n.translations = {
  fr: {
    screen: {
      navigation: {
        events_bar_name: 'Events',
        members_bar_name: 'Membres'
      },
      events: {
        refresh_listview: 'Rafraichir la liste des events'
      },
      members: {
        refresh_listview: 'Rafraichir la liste des membres'
      }
    },
    component: {
      event: {
        date_format: 'DD/MM/YY à HH:mm',
        details_row_label: {
          date: 'DATE DE L\'EVENEMENT',
          address: 'ADRESSE DU RENDEZ-VOUS',
          participants: 'RSVP'
        }
      },
      event_upcoming_rsvp: {
        going: 'Présent',
        waiting_list: 'Liste d\'attente',
        available: 'Place(s) restante(s)',
      },
      event_past_rsvp: {
        going: {
          one: 'participant',
          other: 'participants'
        },
      }
    }
  }
};

module.exports = I18n;
