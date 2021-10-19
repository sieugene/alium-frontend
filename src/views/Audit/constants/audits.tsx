// const audit1_image='/images/audits/01_Certificate_Aliumswap.png'
const aliumswap = '/images/audits/01_Certificate_Aliumswap.png'
const securityAssesmentImage = '/images/audits/02_Certificate_Aliumswap.png'
const jun_cert1 = '/images/audits/1jun_cert.png'
const cert08 = '/images/audits/certificate_08.jpg'
const cert15 = '/images/audits/certificate_15.jpg'
const certikImage = '/images/audits/certik.png'
const quilAuditsCert = '/images/audits/quilAudits_cert.png'
const quillhashImage = '/images/audits/quillhash.jpeg'
const chainsultingImage = '/images/audits/chainsulting.png'
const smartContract = '/images/audits/smart_contract_code.jpg'

export interface AuditType {
  id: number
  headline: string
  date: string
  distribution?: string
  gitHubCertificate?: string[]
  detailedReport?: string
  gitHubCerificatePDF?: string
  bscScan?: string
  headImg: string
  image: string
}

const cardList = [
  {
    // certic
    headline: 'Alium Finance Smart Contracts Audit',
    date: 'October 7st, 2021',
    gitHubCertificate: [
      'https://github.com/Alium-Finance/alium-farm/blob/master/contracts/MasterChef.sol',
      'https://github.com/Alium-Finance/alium-farm/blob/master/contracts/FarmingTicketWindow.sol',
      'https://github.com/Alium-Finance/strong-holders-pool-contract/blob/main/contracts/StrongHolderPool.sol',
      'https://github.com/Alium-Finance/strong-holders-pool-contract/blob/main/contracts/NFTRewardPool.sol',
    ],
    detailedReport: 'https://github.com/Quillhash/Audit_Reports/blob/master/Alium',
    image: quilAuditsCert,
    headImg: quillhashImage,
  },
  {
    // certic
    headline: 'Alium Factory Security Assessment, CertiK',
    date: 'Jun 1st, 2021',
    gitHubCertificate: [
      'https://github.com/Alium-Finance/alium-swap-heco/blob/master/alium-swap-core/contracts/AliumFactory.sol',
    ],
    detailedReport: 'https://www.certik.org/projects/aliumswap',
    image: jun_cert1,
    headImg: certikImage,
  },
  {
    // certic
    headline: 'Alium Router Security Assessment, CertiK',
    date: 'Jun 1st, 2021',
    gitHubCertificate: [
      'https://github.com/Alium-Finance/alium-swap-heco/blob/master/alium-swap-periphery/contracts/AliumRouter.sol',
    ],
    detailedReport: 'https://www.certik.org/projects/aliumswap',
    image: jun_cert1,
    headImg: certikImage,
  },
  {
    // certic
    headline: 'Security Assessment Alium Farm by CertiK',
    date: 'May 15th, 2021',
    gitHubCertificate: ['https://github.com/Alium-Finance/alium-farm/blob/master/contracts/AliumToken.sol'],
    detailedReport: 'https://drive.google.com/file/d/1DuyR97HWPk8Nxe5VJ8S9l3cdCZQwkGK5/view',
    image: cert15,
    headImg: certikImage,
  },
  {
    // certic
    headline: 'SMART CONTRACT CODE REVIEW AND SECURITY ANALYSIS REPORT BY HACKEN',
    date: 'May 12th , 2021',
    gitHubCertificate: ['https://github.com/Alium-Finance/alium-farm/blob/master/contracts/AliumToken.sol'],
    detailedReport: 'https://drive.google.com/file/d/1oC_wrSwjw_47scZBeuHavTvtjwWmwQXS/view',
    image: smartContract,
    headImg: certikImage,
  },
  {
    // certic
    headline: 'Security Assessment Alium Collectible by CertiK',
    date: 'May 8th, 2021',
    gitHubCertificate: ['https://github.com/Alium-Finance/alium-collectible/blob/master/contracts/NFTPublicSeller.sol'],
    detailedReport: 'https://drive.google.com/file/d/1Vd03-3ro62UvYMLeR8PHrmP5AeVBSD6v/view',
    image: cert08,
    headImg: certikImage,
  },
  {
    headline: 'Core Contracts Audit',
    date: '13th April 2021',
    distribution: 'Chainsulting',
    gitHubCertificate: [
      'https://github.com/alium-official/alium-collectible/blob/master/contracts/AliumCollectible.sol',
    ],
    bscScan: 'https://www.bscscan.com/address/0x2991cc4aB9286416b7925916aE6bD2Dc5AF7bAcb',
    detailedReport:
      'https://github.com/chainsulting/Smart-Contract-Security-Audits/blob/master/Aliumswap/02_Smart%20Contract%20Audit_AliumSwap_Core.pdf',
    gitHubCerificatePDF:
      'https://github.com/chainsulting/Smart-Contract-Security-Audits/blob/master/Aliumswap/01_Certificate_Aliumswap_AMM.pdf',
    // aliumswap core links to github
    image: aliumswap,
    headImg: chainsultingImage,
  },
  {
    // certic
    headline: 'Liquidity Migration Contract Audit',
    date: '7th April 2021',
    gitHubCertificate: ['https://github.com/alium-official/alium-liquidity-migration'],
    detailedReport: 'https://www.certik.org/projects/aliumswap',
    image: securityAssesmentImage,
    headImg: certikImage,
  },
].map((item, i) => ({ ...item, id: i })) as Array<AuditType>

export default cardList
