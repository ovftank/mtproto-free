export default async (req, res) => {
  try {
    const resp = await fetch('https://mtpro.xyz/api/?type=mtproto');
    const data = await resp.json();

    const nearbyCountries = ['SG', 'HK', 'JP', 'MY', 'TH', 'KR', 'ID', 'PH'];

    const filtered = data
      .filter(item => nearbyCountries.includes(item.country))
      .sort((a, b) => b.updateTime - a.updateTime);

    const result = filtered.map(({ host, port, secret, updateTime, country }) => ({
      link: `tg://proxy?server=${host}&port=${port}&secret=${secret}`,
      updateTime,
      country,
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ msg: 'lỗi fetch proxy', err: err.message });
  }
};
