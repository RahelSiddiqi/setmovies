module.exports = {
    mode: 'jit',
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            height: {
                mcard: '260px',
                card: '435px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
