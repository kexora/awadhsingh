import { Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumePDF } from './ResumePDF';

interface DownloadResumeButtonProps {
  data: any;
  websiteUrl: string;
  variant: 'desktop' | 'mobile';
}

export default function DownloadResumeButton({
  data,
  websiteUrl,
  variant,
}: DownloadResumeButtonProps) {
  const isDesktop = variant === 'desktop';

  return (
    <PDFDownloadLink
      document={<ResumePDF data={data} websiteUrl={websiteUrl} />}
      fileName="Awadh_Kishore_Singh_Resume.pdf"
      className={
        isDesktop
          ? 'hidden md:inline-flex items-center justify-center gap-2 bg-[#1e3a8a] text-white px-5 py-2.5 rounded hover:bg-blue-800 transition-colors shadow-sm text-sm font-medium print:hidden shrink-0 cursor-pointer'
          : 'inline-flex w-full items-center justify-center gap-2.5 bg-[#1e3a8a]/5 text-[#1e3a8a] border border-[#1e3a8a]/20 px-5 py-3.5 rounded-xl active:bg-[#1e3a8a]/10 transition-colors text-[14px] font-bold cursor-pointer'
      }
    >
      {({ loading }) =>
        loading ? (
          'Generating PDF...'
        ) : (
          <>
            <Download className={isDesktop ? 'w-4 h-4' : 'w-[18px] h-[18px]'} />
            {isDesktop ? 'Download PDF' : 'Download Resume (PDF)'}
          </>
        )
      }
    </PDFDownloadLink>
  );
}
