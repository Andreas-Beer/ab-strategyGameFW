import { expect, use } from 'chai';
import Sinon from 'sinon';
import sinonChai from 'sinon-chai';
use(sinonChai);

import { EffectEventBus } from './EffectEventBus';

describe('components/EffectEventBus.ts', () => {
  describe('addHandler', () => {
    let bus: EffectEventBus;

    beforeEach(() => {
      bus = new EffectEventBus();
    });

    beforeEach(() => {
      Sinon.restore();
    });

    it('should add the given handler to the map', () => {
      const handlerKey = 'myKey';
      const handler = () => {};

      bus.addHandler(handlerKey, handler);

      expect(bus)
        .to.have.property('effectsMap')
        .have.property(handlerKey, handler);
    });

    it('should warn if the key was not found', () => {
      const warnStub = Sinon.stub(console, 'warn');
      const handlerKey = 'myKey';
      bus.activateEvent(handlerKey, {});

      expect(warnStub).to.be.called;
    });

    it('should call the given handler if the key was not found', () => {
      const handlerKey = 'myKey';
      const handler = Sinon.spy();

      bus.addHandler(handlerKey, handler);
      bus.activateEvent(handlerKey, {});

      expect(handler).to.be.called;
    });
  });
});
