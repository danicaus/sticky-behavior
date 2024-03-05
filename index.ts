export class Sticky {
    public section: HTMLDivElement
    public stepWrapper: HTMLDivElement
    public stepWindow: HTMLDivElement
    public steps: NodeListOf<HTMLDivElement>
    public controls: NodeListOf<HTMLDivElement>
    sliderHeight: number
    
    constructor(groupName: string) {
        this.section = document.querySelector(`[data-${groupName}]`)
        this.stepWrapper = document.querySelector(`[data-${groupName}-wrapper]`)
        this.stepWindow = document.querySelector(`[data-${groupName}-window]`)
        this.steps = document.querySelectorAll(`[data-${groupName}-step]`)
        this.controls = document.querySelectorAll(`[data-${groupName}-img]`)
        
        // this.indiceStepAtual = 0
        this.sliderHeight = this.getStepWrapperHeight()
        
        this.section.style.willChange = 'transform'
        this.section.style.padding = '11.375rem 3.875rem'
        this.stepWrapper.style.position = 'relative'
        
        this.checkPosition = this.checkPosition.bind(this)
        
        this.checkPosition()
        window.addEventListener('load', this.checkPosition)
        window.addEventListener('scroll', this.checkPosition)
        
    }
    
    getStepWrapperHeight() {
        return this.stepWrapper.getBoundingClientRect().height
    }
    
    getStepWrapperPosition() {
        return this.stepWrapper.getBoundingClientRect().top
    }
    
    getTriggerTop() {
        return (window.innerHeight - this.getStepWrapperHeight()) / 2
    }
    
    getStepHeight() {
        const stepsSizes : number[] = [] 
        this.steps.forEach(step => stepsSizes.push(step.getBoundingClientRect().height))
        const biggerStep = stepsSizes.sort((a, b) => a - b)[stepsSizes.length - 1]
        return biggerStep
    }

    isSectionOnTop() {
        return this.section.getBoundingClientRect().top <= 0
    }
    
    hasExibitionEnded() {
        return this.section.getBoundingClientRect().bottom <= window.innerHeight
    }
    
    checkPosition() {
        this.stepWindow.style.transform = `translateY(0px)`
        
        if(this.isSectionOnTop()) {
            if (this.hasExibitionEnded()) {
                this.stepWindow.style.transform = `translateY(${113.75 - this.getStepWrapperPosition()}px)`
                return
            }
            this.stepWindow.style.transform = `translateY(${113.75 - this.getStepWrapperPosition()}px)`
        }
    }
}

// se não tiver imagens, eu crio elementos invisíveis de mesmo tamanho de cada step. a alteração dos steps vai considerar a posiçào do scroll. quando o controle chegar no topo, muda o step

//adicionar um destroy

