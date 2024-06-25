export interface TemplateData {
  name: string
  description: string
  file: string
}

export const packageTemplateList: TemplateData[] = [
  {
    name: 'package/lib',
    description: 'package or library project template',
    file: 'assets/template/package.zip'
  }
]
