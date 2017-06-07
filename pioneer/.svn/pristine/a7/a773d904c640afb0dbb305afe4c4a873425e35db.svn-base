<%@ tag language="java" pageEncoding="UTF-8" %>
<%@ attribute name="formName" description="formName" required="true" %>

			<div class="pagetools"> 
			<input type="hidden" name="recordCount" value="${page.recordCount}"/>
			共<span class="pagenum"> ${page.recordCount}</span>条 
			每页<span class="pagenum">${page.pageNumber}</span>条 
			共<span class="pagenum">${page.pageCount}</span>页&nbsp;
			第<input type="text" name="pageIndex" id="pageIndex" value="${page.pageIndex}" style="width:20px;"/></span>页
            <a href="javascript:void gotoPage.first();">
                                                              
					<img align="absmiddle" alt="首页" title="首页" src="../res/sys/themes/default/style/images/first_page.png" />
				   
				</a>
				<a href="javascript:void ${ page.pageIndex > 1 ? 'gotoPage.pre()' : '(0)' };">
					
					<img align="absmiddle" alt="上一页" title="上一页" src="../res/sys/themes/default/style/images/pre_page.png" />
				    
				</a>
				<a href="javascript:void ${ page.pageIndex < page.recordCount ? 'gotoPage.next()' : '(0)' };">
					 
					<img align="absmiddle" alt="下一页" title="下一页" src="../res/sys/themes/default/style/images/next_page.png" />
				    
				</a>
				<a href="javascript:void gotoPage.last();">
				  
					<img align="absmiddle" alt="尾页" title="尾页" src="../res/sys/themes/default/style/images/last_page.png" />
				     
				</a>
             </div>
			
			
			

			<script type="text/javascript">
				var gotoPage = {
						checkNumber : function(input){
							input.value = input.value.replace(/\D/g, "");
						},
						send : function(){
							//var form = document.forms["${ formName }"];
							//if(form){
								//form.submit();
							//}
							$("#${ formName }").submit();
						},
						first : function(){
							document.getElementById("pageIndex").value = 1;
							this.send();
						},
						pre : function(){
							document.getElementById("pageIndex").value = "${page.pageIndex-1}";
							this.send();
						},
						next : function(){
						   
							document.getElementById("pageIndex").value = "${page.pageIndex+1 > page.pageCount ? page.pageCount : page.pageIndex+1}";
							this.send();
						},
						last : function(){
							document.getElementById("pageIndex").value = "${page.pageCount}";
							this.send();
						}
				};
			</script>
			</div>
		</div>