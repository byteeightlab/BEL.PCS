/*!
 * PrefersColorScheme [BEL.PCS] v0.1
 * https://byteeightlab.ru/#PCS
 *
 * Released under the GNU General Public License v3.0
 * http://byteeightlab.ru/source/bel_pcs/LICENSE
 *
 * Date: 2023-11-02T07:00Z
 */

(function(W){
    let prefersColorScheme = function(){
        let event = new Event('prefersColorSchemeChange'),
            metaScheme = document.head.querySelector('meta[name="color-scheme"]'),
            metaSupported = document.head.querySelector('meta[name="supported-color-schemes"]'),
            supported = [ 'light', 'dark' ],
            lsName = 'prefers-color-scheme',
            documentElement = document.documentElement;

        if(!metaSupported){
            metaSupported = document.createElement('meta');
            metaSupported.name = 'supported-color-schemes';
            metaSupported.content = supported.join(' ');
            document.head.append(metaSupported);
        }else{
            supported = metaSupported.content.split(' ').map( i => i.toLowerCase() );
            if( !supported.includes('light') ) supported.push('light');
            if( !supported.includes('dark') ) supported.push('dark');
        }

        if(!metaScheme){
            metaScheme = document.createElement('meta');
            metaScheme.name = 'color-scheme';
            document.head.append(metaScheme);
        }

        let pcsf = function prefersColorScheme( theme, write ){
            if( theme ) return pcsf.set( theme, write );
            return pcsf.get();
        }

        pcsf.get = function(){
            return localStorage.getItem(lsName) ?? supported.includes(metaScheme.content) ? metaScheme.content : this.systemic();
        }

        pcsf.systemic = function(){
            return ( W.matchMedia('(prefers-color-scheme: dark)')?.matches ) ? 'dark' : 'light';
        }

        pcsf.supported = function(){
            return supported;
        }

        pcsf.set = function( theme, write ){
            if( !supported.includes( theme.toLowerCase() ) ) theme = supported[0];
            if( write === undefined || write === true ) localStorage.setItem( lsName, theme );
            documentElement.classList.remove( ...supported.map( i => i + '-theme') );
            documentElement.classList.add( theme + '-theme' );
            metaScheme.content = theme;
            documentElement.dispatchEvent(event);
        }

        pcsf.remove = function(){
            localStorage.removeItem(lsName);
            this.set( this.get(), false );
        }

        pcsf.toggle = function(write){
            let index = supported.indexOf( this.get() ); index++;
            if( index >= supported.length ) index = 0;
            console.log(supported[index],index);
            this.set( supported[index], write );
        }

        let matchMediaChange = function(e){
            let theme = localStorage.getItem(lsName);
            if(!theme) this.set( e.matches ? 'dark' : 'light', false );
        }

        let theme = localStorage.getItem(lsName);

        pcsf.set( theme ? theme : ( supported.includes(metaScheme.content) ? metaScheme.content : pcsf.systemic() ), false );

        W.matchMedia('(prefers-color-scheme: dark)').addEventListener( 'change', e => matchMediaChange(e) );

        return pcsf;
    };

    W.prefersColorScheme = prefersColorScheme();

})(window);