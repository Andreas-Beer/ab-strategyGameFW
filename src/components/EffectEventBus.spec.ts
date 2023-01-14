import { expect, use } from 'chai';
import Sinon from 'sinon';
import sinonChai from 'sinon-chai';
use(sinonChai);

import { EffectBus } from './EffectEventBus';

describe('components/EffectEventBus.ts', () => {
  describe('addHandler', () => {
    let bus: EffectBus;

    beforeEach(() => {
      bus = new EffectBus();
    });

    beforeEach(() => {
      Sinon.restore();
    });

    it('should add the given handler to the map', () => {
      const handlerKey = 'myKey';
      const handler = () => {};

      bus.registerEffectHandler(handlerKey, handler);

      expect(bus)
        .to.have.property('effectsMap')
        .have.property(handlerKey, handler);
    });

    it('should warn if the key was not found', () => {
      const warnStub = Sinon.stub(console, 'warn');
      const handlerKey = 'myKey';
      bus.triggerEffect(handlerKey, {});

      expect(warnStub).to.be.called;
    });

    it('should call the given handler if the key was not found', () => {
      const handlerKey = 'myKey';
      const handler = Sinon.spy();

      bus.registerEffectHandler(handlerKey, handler);
      bus.triggerEffect(handlerKey, {});

      expect(handler).to.be.called;
    });
  });
});
