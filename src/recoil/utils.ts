import {useRecoilCallback} from 'recoil';

export const logRecoil = useRecoilCallback(
  ({snapshot}) =>
    async () => {
      console.debug('Atom values:');
      for (const node of snapshot.getNodes_UNSTABLE()) {
        const value = await snapshot.getPromise(node);
        console.debug(node.key, value);
      }
    },
  [],
);
