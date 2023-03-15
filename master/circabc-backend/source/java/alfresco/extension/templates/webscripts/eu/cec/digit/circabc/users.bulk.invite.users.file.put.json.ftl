<#escape x as jsonUtils.encodeJSONString(x)>
[
  <#list userData as c>
	{
		"username": "<#if (c.user)??>${c.user.ecasUserName}</#if>",
		"igName": "<#if (c.igName)??>${c.igName}</#if>",
		"igRef": "<#if (c.igRef)??>${c.igRef}</#if>",
		"fromFile": "<#if (c.fromFile)??>${c.fromFile}</#if>",
		"email": "<#if (c.user.email)??>${c.user.email}</#if>",
		"profileId": "<#if (c.profile)??>${c.profile}</#if>",
		"status": "${c.status}"
	}<#if (c_has_next)>,</#if>
  </#list>	
]
</#escape>