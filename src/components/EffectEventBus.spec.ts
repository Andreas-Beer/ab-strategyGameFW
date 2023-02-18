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

    afterEach(() => {
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

      global.NODE_ENV = 'test';
      bus.triggerEffect(handlerKey, {});
      expect(warnStub).to.be.called;
      global.NODE_ENV = '';
    });

    it('should call the given handler if the key was not found', () => {
      const handlerKey = 'myKey';
      const handler = Sinon.spy();

      global.NODE_ENV = 'test';
      bus.registerEffectHandler(handlerKey, handler);
      bus.triggerEffect(handlerKey, {});
      global.NODE_ENV = '';

      expect(handler).to.be.called;
    });
  });
});
