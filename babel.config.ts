module.exports = function(api) {
    const presets = [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ];
  
    const plugins = [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-runtime',
      "babel-plugin-transform-import-meta",
    ];
  
    return {
      presets,
      plugins,
    };
  };
  