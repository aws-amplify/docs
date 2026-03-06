const ANALYTICS_CSP = {
  all: {
    connect: [
      'https://amazonwebservices.d2.sc.omtrdc.net',
      'https://aws.demdex.net',
      'https://dpm.demdex.net',
      'https://cm.everesttech.net',
      'https://prod.tools.shortbread.aws.dev',
      'https://prod.log.shortbread.aws.dev'
    ],
    img: [
      'https://amazonwebservices.d2.sc.omtrdc.net',
      'https://aws.demdex.net',
      'https://dpm.demdex.net',
      'https://cm.everesttech.net'
    ],
    frame: ['https://aws.demdex.net', 'https://dpm.demdex.net'],
    script: ['https://prod.assets.shortbread.aws.dev'],
    style: ['https://prod.assets.shortbread.aws.dev']
  },
  prod: {
    connect: [
      'https://d2c.aws.amazon.com/',
      'https://vs.aws.amazon.com',
      'https://a0.awsstatic.com/',
      'https://aws.amazon.com/'
    ],
    img: ['https://a0.awsstatic.com/', 'https://d2c.aws.amazon.com/'],
    script: ['https://a0.awsstatic.com/', 'https://d2c.aws.amazon.com/']
  },
  alpha: {
    connect: [
      'https://aa0.awsstatic.com/',
      'https://alpha.d2c.marketing.aws.dev/',
      'https://aws-mktg-csds-alpha.integ.amazon.com/',
      'https://d2c-alpha.dse.marketing.aws.a2z.com',
      'https://vs-alpha.aws.amazon.com'
    ],
    img: ['https://aa0.awsstatic.com/', 'https://alpha.d2c.marketing.aws.dev/'],
    script: [
      'https://aa0.awsstatic.com/',
      'https://alpha.d2c.marketing.aws.dev/'
    ]
  }
};

export { ANALYTICS_CSP };
