import ChainElement from './chain-element';
const chains: { [id: string]: ChainElement } = {
  'should': {},
  'to': {},
  'be': {},
  'been': {},
  'is': {},
  'that': {},
  'which': {},
  'and': {},
  'has': {},
  'have': {},
  'with': {},
  'at': {},
  'of': {},
  'same': {},
  'not': {
    children: {
      'a': {
        children: {
          'number': {
            alias: 'NaN'
          }
        }
      }
    }
  },
  'deep': {},
  'any': {},
  'all': {},
  'a': {
    parameters: 1,
    optionalParameters: 1
  },
  'an': {
    parameters: 1,
    optionalParameters: 1
  },
  'include': {
    parameters: 1,
    optionalParameters: 1
  },
  'includes': {
    alias: 'include'
  },
  'contain': {
    parameters: 1,
    optionalParameters: 1,
  },
  'contains': {
    alias: 'contain'
  },
  'ok': {},
  'true': {},
  'false': {},
  'null': {},
  'undefined': {},
  'NaN': {},
  'exist': {},
  'exists': {
    alias: 'exist'
  },
  'empty': {},
  'arguments': {},
  'equal': {
    parameters: 1,
    optionalParameters: 1,
    children: {
      'to': {
        alias: 'equal'
      }
    }
  },
  'equals': {
    alias: 'equal'
  },
  'eql': {
    parameters: 1,
    optionalParameters: 1
  },
  'above': {
    parameters: 1,
    optionalParameters: 1
  },
  'least': {
    parameters: 1,
    optionalParameters: 1
  },
  'below': {
    parameters: 1,
    optionalParameters: 1
  },
  'most': {
    parameters: 1,
    optionalParameters: 1
  },
  'within': {
    parameters: 2,
    optionalParameters: 1
  },
  'instanceof': {
    parameters: 1,
    optionalParameters: 1
  },
  'instance': {
    children: {
      'of': {
        alias: 'instanceof'
      }
    }
  },
  'property': {
    parameters: 1,
    optionalParameters: 2
  },
  'ownProperty': {
    parameters: 1,
    optionalParameters: 1
  },
  'ownPropertyDescriptor': {
    parameters: 1,
    optionalParameters: 2
  },
  'own': {
    children: {
      'property': {
        children: {
          'descriptor': {
            alias: 'ownPropertyDescriptor'
          }
        },
        alias: 'ownProperty'
      }
    }
  },
  'lengthOf': {
    parameters: 1,
    optionalParameters: 1
  },
  'length': {
    children: {
      'of': {
        alias: 'lengthOf'
      }
    }
  },
  'match': {
    parameters: 1,
    optionalParameters: 1
  },
  'matches': {
    alias: 'match'
  },
  'string': {
    parameters: 1,
    optionalParameters: 1
  },
  'keys': {
    parameters: 1,
    optionalParameters: 999
  },
  'throw': {
    parameters: 1,
    optionalParameters: 2
  },
  'throws': {
    alias: 'throw'
  },
  'respondTo': {
    parameters: 1,
    optionalParameters: 1
  },
  'respond': {
    children: {
      'to': {
        alias: 'respondTo'
      }
    }
  },
  'responds': {
    alias: 'respondTo',
    children: {
      'to': {
        alias: 'respondTo'
      }
    }
  },
  'itself': {},
  'satisfy': {
    parameters: 1,
    optionalParameters: 1
  },
  'satisfies': {
    alias: 'satisfy'
  },
  'closeTo': {
    parameters: 2,
    optionalParameters: 1
  },
  'close': {
    children: {
      'to': {
        alias: 'closeTo'
      }
    }
  },
  'members': {
    parameters: 1,
    optionalParameters: 1
  },
  'oneOf': {
    parameters: 1,
    optionalParameters: 1
  },
  'one': {
    children: {
      'of': {
        alias: 'oneOf'
      }
    }
  },
  'change': {
    parameters: 2,
    optionalParameters: 1
  },
  'changes': {
    alias: 'change'
  },
  'increase': {
    parameters: 2,
    optionalParameters: 1
  },
  'increases': {
    alias: 'increase'
  },
  'decrease': {
    parameters: 2,
    optionalParameters: 1
  },
  'decreases': {
    alias: 'decrease'
  },
  'extensible': {},
  'sealed': {},
  'frozen': {},
  'greater': {
    children: {
      'than': {
        alias: 'above'
      },
      alias: 'above'
    }
  },
  'lower': {
    children: {
      'than': {
        alias: 'below'
      },
      alias: 'below'
    }
  },
  'less': {
    children: {
      'than': {
        alias: 'below'
      },
      alias: 'below'
    }
  },
  'exactly': {
    alias: 'eql'
  }
};
export default chains;