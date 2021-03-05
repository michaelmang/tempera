import scorecard from '@tempera/postcss-scorecard';
import { utils } from 'stylelint';

import { namespace, validateSpecs } from '../utils';

export const ruleName = namespace('official-specs');
export const messages = utils.ruleMessages(ruleName, {
  'official-specs': ({ spec, nearestSpec }) => {
    const prefix = `An unofficial spec was detected: "${spec}"`;
    if (!nearestSpec) {
      return prefix;
    }

    return `${prefix}. The nearest official spec is ${nearestSpec}`;
  }
});

export default {
  'official-specs': function rule(specs = {}) {
    return (root, result) => {
      const validOptions = utils.validateOptions(result, ruleName, {
        actual: specs,
        possible: [validateSpecs]
      });
  
      if (!validOptions) {
        return null;
      }

      const { Once } = scorecard({
        onInvalid: (score) => {
          const spec = score.value;
          const nearestSpec = score.nearestValue;
          const node = score.context;

          utils.report({ message: messages['official-specs']({ spec, nearestSpec }), node, result, ruleName })
        },
        specs,
      });
      Once(root);
    };
  }
};