import { expect } from 'chai';
import { PlayerData } from '../../types/playerData.types';
import { getPlayerData, _test } from './playerData';

const data = { id: 1, email: '1@1.test' };

describe('data/playerData.ts', () => {
  beforeEach(() => {
    return getPlayerData(1).then((d) => {
      playerData = d;
    });
  });

  describe('set', () => {
    it('could be modified values', () => {
      const emailNew = 'nix@da.net';
      playerData.set('email', emailNew);
      expect(playerData.get('email')).to.be.eq(emailNew);
    });
  });
  describe('getPlayerData', () => {
    it('could be modified values', () => {
      return getPlayerData(1).then((playerData: PlayerData) => {
        expect(playerData).to.be.an('object').include.keys('get', 'set');
      });
    });
  });
  describe('test/fetchPlayerData', () => {
    it('could be modified values', () => {
      return _test.fetchPlayerData(1).then((playerData: PlayerData) => {
        expect(playerData)
          .to.be.an('object')
          .include.keys(
            'id',
            'email',
            'xp',
            'avatarId',
            'level',
            'name',
            'prestige',
            'towns',
          );
      });
    });
  });
});
