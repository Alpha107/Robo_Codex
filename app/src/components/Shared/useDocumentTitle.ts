import { useEffect } from 'react';

const SITE_NAME = 'RoboCodex';

export default function useDocumentTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Interactive 3D Hardware Reference`;
  }, [title]);
}
