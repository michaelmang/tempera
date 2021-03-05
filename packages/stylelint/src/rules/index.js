import scorecard from '@tempera/postcss-scorecard';
import { utils } from 'stylelint';

import { namespace } from '../utils';

export const ruleName = namespace('unofficial');
export const messages = utils.ruleMessages(ruleName, {
  unofficial: ({ spec, nearestSpec }) => `Unofficial spec: "${spec}"`
});

export default {
  unofficial: function rule(enabled) {
    return (root, result) => {
      const validOptions = utils.validateOptions(result, ruleName, {
        actual: enabled,
        possible: [true, false]
      });
  
      if (!validOptions) {
        return null;
      }
    };
  }
};