// tslint:disable: no-implicit-dependencies max-func-body-length no-unused-expression

import chai from 'chai';
import * as sinon from 'sinon';
import _ from 'lodash';
import { describe } from 'mocha';

import { TestUtils } from '../../../test-utils';
import * as SNodeAPI from '../../../../session/snode_api';

import chaiAsPromised from 'chai-as-promised';
import * as OnionPaths from '../../../../session/onions/onionPath';
import { Snode } from '../../../../data/data';
chai.use(chaiAsPromised as any);
chai.should();

const { expect } = chai;

const guard1ed = 'e3ec6fcc79e64c2af6a48a9865d4bf4b739ec7708d75f35acc3d478f9161534e';
const guard2ed = 'e3ec6fcc79e64c2af6a48a9865d4bf4b739ec7708d75f35acc3d478f91615349';
const guard3ed = 'e3ec6fcc79e64c2af6a48a9865d4bf4b739ec7708d75f35acc3d478f9161534a';

const fakeSnodePool = [
  {
    ip: '136.243.103.171',
    port: 22116,
    pubkey_x25519: '0f78775bf189a6eaca2f9c873524832aae8e87a5bf792fb394df97b21173f50c',
    pubkey_ed25519: 'e3ec6fcc79e64c2af6a48a9865d4bf4b739ec7708d75f35acc3d478f9161534d',
    version: '',
  },
  {
    ip: '136.243.103.172',
    port: 22116,
    pubkey_x25519: '0f78775bf189a6eaca2f9c873524832aae8e87a5bf792fb394df97b21173f50c',
    pubkey_ed25519: 'e3ec6fcc79e64c2af6a48a9865d4bf4b739ec7708d75f35acc3d478f91615341',
    version: '',
  },
  {
    ip: '136.243.103.173',
    port: 22116,
    pubkey_x25519: '0f78775bf189a6eaca2f9c873524832aae8e87a5bf792fb394df97b21173f50c',
    pubkey_ed25519: 'e3ec6fcc79e64c2af6a48a9865d4bf4b739ec7708d75f35acc3d478f91615342',
    version: '',
  },
  {
    ip: '136.243.103.174',
    port: 22116,
    pubkey_x25519: '0f78775bf189a6eaca2f9c873524832aae8e87a5bf792fb394df97b21173f50c',
    pubkey_ed25519: 'e3ec6fcc79e64c2af6a48a9865d4bf4b739ec7708d75f35acc3d478f91615343',
    version: '',
  },
  {
    ip: '136.243.103.175',
    port: 22116,
    pubkey_x25519: '0f78775bf189a6eaca2f9c873524832aae8e87a5bf792fb394df97b21173f50c',
    pubkey_ed25519: 'e3ec6fcc79e64c2af6a48a9865d4bf4b739ec7708d75f35acc3d478f91615344',
    version: '',
  },
  {
    ip: '136.243.103.176',
    port: 22116,
    pubkey_x25519: '0f78775bf189a6eaca2f9c873524832aae8e87a5bf792fb394df97b21173f50c',
    pubkey_ed25519: 'e3ec6fcc79e64c2af6a48a9865d4bf4b739ec7708d75f35acc3d478f91615345',
    version: '',
  },
  {
    ip: '136.243.103.177',
    port: 22116,
    pubkey_x25519: '0f78775bf189a6eaca2f9c873524832aae8e87a5bf792fb394df97b21173f50c',
    pubkey_ed25519: 'e3ec6fcc79e64c2af6a48a9865d4bf4b739ec7708d75f35acc3d478f91615346',
    version: '',
  },
  {
    ip: '136.243.103.178',
    port: 22116,
    pubkey_x25519: '0f78775bf189a6eaca2f9c873524832aae8e87a5bf792fb394df97b21173f50c',
    pubkey_ed25519: 'e3ec6fcc79e64c2af6a48a9865d4bf4b739ec7708d75f35acc3d478f91615347',
    version: '',
  },
  {
    ip: '136.243.103.179',
    port: 22116,
    pubkey_x25519: '0f78775bf189a6eaca2f9c873524832aae8e87a5bf792fb394df97b21173f50c',
    pubkey_ed25519: 'e3ec6fcc79e64c2af6a48a9865d4bf4b739ec7708d75f35acc3d478f91615348',
    version: '',
  },
  {
    ip: '136.243.103.180',
    port: 22116,
    pubkey_x25519: '0f78775bf189a6eaca2f9c873524832aae8e87a5bf792fb394df97b21173f50c',
    pubkey_ed25519: guard1ed,
    version: '',
  },
  {
    ip: '136.243.103.181',
    port: 22116,
    pubkey_x25519: '0f78775bf189a6eaca2f9c873524832aae8e87a5bf792fb394df97b21173f50c',
    pubkey_ed25519: guard2ed,
    version: '',
  },
  {
    ip: '136.243.103.182',
    port: 22116,
    pubkey_x25519: '0f78775bf189a6eaca2f9c873524832aae8e87a5bf792fb394df97b21173f50c',
    pubkey_ed25519: guard3ed,
    version: '',
  },
  {
    ip: '136.243.103.183',
    port: 22116,
    pubkey_x25519: '0f78775bf189a6eaca2f9c873524832aae8e87a5bf792fb394df97b21173f50c',
    pubkey_ed25519: 'e3ec6fcc79e64c2af6a48a9865d4bf4b739ec7708d75f35acc3d478f91615356',
    version: '',
  },
];

const fakeGuardNodesEd25519 = [guard1ed, guard2ed, guard3ed];
const fakeGuardNodes = fakeSnodePool.filter(m => fakeGuardNodesEd25519.includes(m.pubkey_ed25519));

// tslint:disable-next-line: max-func-body-length
describe('OnionPaths', () => {
  // Initialize new stubbed cache
  const sandbox = sinon.createSandbox();
  let oldOnionPaths: Array<Array<Snode>>;

  beforeEach(async () => {
    // Utils Stubs
    OnionPaths.clearTestOnionPath();

    sandbox.stub(OnionPaths, 'selectGuardNodes').resolves(fakeGuardNodes);
    sandbox.stub(SNodeAPI.SNodeAPI, 'getSnodePoolFromSnode').resolves(fakeGuardNodes);
    TestUtils.stubData('getGuardNodes').resolves(fakeGuardNodesEd25519);
    TestUtils.stubWindow('getSeedNodeList', () => ['seednode1']);

    sandbox.stub(SNodeAPI.SnodePool, 'refreshRandomPoolDetail').resolves(fakeSnodePool);
    SNodeAPI.Onions.TEST_resetSnodeFailureCount();
    OnionPaths.TEST_resetPathFailureCount();
    // get a copy of what old ones look like
    await OnionPaths.getOnionPath();

    oldOnionPaths = OnionPaths.TEST_getTestOnionPath();
    if (oldOnionPaths.length !== 3) {
      throw new Error(`onion path length not enough ${oldOnionPaths.length}`);
    }
    // this just triggers a build of the onionPaths
  });

  afterEach(() => {
    TestUtils.restoreStubs();
    sandbox.restore();
  });

  describe('dropSnodeFromPath', () => {
    describe('with valid snode pool', () => {
      it('rebuilds after removing last snode on path', async () => {
        await OnionPaths.dropSnodeFromPath(oldOnionPaths[2][2].pubkey_ed25519);
        const newOnionPath = OnionPaths.TEST_getTestOnionPath();

        // only the last snode should have been updated
        expect(newOnionPath).to.be.not.deep.equal(oldOnionPaths);
        expect(newOnionPath[0]).to.be.deep.equal(oldOnionPaths[0]);
        expect(newOnionPath[1]).to.be.deep.equal(oldOnionPaths[1]);
        expect(newOnionPath[2][0]).to.be.deep.equal(oldOnionPaths[2][0]);
        expect(newOnionPath[2][1]).to.be.deep.equal(oldOnionPaths[2][1]);
        expect(newOnionPath[2][2]).to.be.not.deep.equal(oldOnionPaths[2][2]);
      });

      it('rebuilds after removing middle snode on path', async () => {
        await OnionPaths.dropSnodeFromPath(oldOnionPaths[2][1].pubkey_ed25519);
        const newOnionPath = OnionPaths.TEST_getTestOnionPath();

        const allEd25519Keys = _.flattenDeep(oldOnionPaths).map(m => m.pubkey_ed25519);

        // only the last snode should have been updated
        expect(newOnionPath).to.be.not.deep.equal(oldOnionPaths);
        expect(newOnionPath[0]).to.be.deep.equal(oldOnionPaths[0]);
        expect(newOnionPath[1]).to.be.deep.equal(oldOnionPaths[1]);
        expect(newOnionPath[2][0]).to.be.deep.equal(oldOnionPaths[2][0]);
        // last item moved to the position one as we removed item 1 and happened one after it
        expect(newOnionPath[2][1]).to.be.deep.equal(oldOnionPaths[2][2]);
        // the last item we happened must not be any of the new path nodes.
        // actually, we remove the nodes causing issues from the snode pool so we shouldn't find this one neither
        expect(allEd25519Keys).to.not.include(newOnionPath[2][2].pubkey_ed25519);
      });
    });
  });
});
